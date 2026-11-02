import { CHALLENGES_BY_TRACK } from '@shared/content';
import { ENCOUNTER_KINDS, type LandId } from '@shared/game';
import type { Challenge, L } from '@shared/types';
import type { DialogueLine } from '../../store';
import type { Marker } from '../mapBuilder';
import type { LandContent, ZoneDef } from './types';

// Zones tie the questions of a part of the map to the person who lives there. Once per play
// session, every challenge of the Land is dealt at random to a zone of a matching difficulty:
// the zone's monsters and chest then ask random questions from that share, and its guide
// teaches all of those concepts. As every challenge is dealt, the guides of a Land together
// teach everything the Land can ask (shrines and boss included).

export type ZoneDeal = Map<ZoneDef, Challenge[]>;

export function zoneAt(content: LandContent, x: number, y: number): ZoneDef | undefined {
  return content.zones.find((z) => x >= z.area.x && y >= z.area.y && x < z.area.x + z.area.w && y < z.area.y + z.area.h);
}

function shuffle<T>(items: T[]): T[] {
  for (let i = items.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [items[i], items[j]] = [items[j], items[i]];
  }
  return items;
}

/** Kept for the whole play session, so what a guide taught still holds after a Game Over. */
const deals = new Map<LandId, ZoneDeal>();

export function dealZones(content: LandContent, markers: Marker[]): ZoneDeal {
  const cached = deals.get(content.id);
  if (cached) return cached;
  const deal: ZoneDeal = new Map(content.zones.map((z) => [z, []]));

  // Count what each zone can actually ask: one question per monster and per chest. A zone
  // without any encounter is skipped, otherwise questions would be dealt where nobody asks them.
  const caps = new Map<ZoneDef, { monster: number; chest: number }>();
  for (const z of content.zones) {
    const inZone = (type: Marker['type']) => markers.filter((m) => m.type === type && zoneAt(content, m.x, m.y) === z).length;
    caps.set(z, { monster: inZone('monster'), chest: inZone('chest') });
  }
  const active = content.zones.filter((z) => {
    const c = caps.get(z)!;
    return c.monster + c.chest > 0;
  });
  if (!active.length) {
    deals.set(content.id, deal);
    return deal;
  }
  const assigned = new Map<ZoneDef, number>(active.map((z) => [z, 0]));

  const canMonster = (c: Challenge) => ENCOUNTER_KINDS.monster.includes(c.kind);
  const canChest = (c: Challenge) => ENCOUNTER_KINDS.chest.includes(c.kind);
  const chestOnly = (c: Challenge) => !canMonster(c);

  // Chest-only challenge kinds (ordering, code) are dealt first so their chests are never
  // stolen by a multiple-choice question that a monster could have asked.
  const queue = shuffle([...CHALLENGES_BY_TRACK[content.id]]).sort(
    (a, b) => Number(chestOnly(b)) - Number(chestOnly(a)),
  );

  for (const c of queue) {
    const byTier = active.filter((z) => z.tiers.includes(c.tier));
    // Prefer a zone whose difficulty matches; fall back to the whole Land if it is full.
    for (const pool of [byTier.length ? byTier : active, active]) {
      const options: { zone: ZoneDef; side: 'monster' | 'chest' }[] = [];
      for (const z of pool) {
        const cap = caps.get(z)!;
        if (cap.monster > 0 && canMonster(c)) options.push({ zone: z, side: 'monster' });
        if (cap.chest > 0 && canChest(c)) options.push({ zone: z, side: 'chest' });
      }
      const usable = chestOnly(c) ? options.filter((o) => o.side === 'chest') : options;
      if (!usable.length) continue;
      const fewest = Math.min(...usable.map((o) => assigned.get(o.zone)!));
      const choices = usable.filter((o) => assigned.get(o.zone) === fewest);
      const pick = choices[Math.floor(Math.random() * choices.length)];
      deal.get(pick.zone)!.push(c);
      assigned.set(pick.zone, assigned.get(pick.zone)! + 1);
      caps.get(pick.zone)![pick.side]--;
      break;
    }
  }
  deals.set(content.id, deal);
  return deal;
}

/** Ids a monster or chest of `zone` may ask (empty: any question of the Land). */
export function zonePool(deal: ZoneDeal, zone: ZoneDef | undefined, type: 'monster' | 'chest'): string[] {
  if (!zone) return [];
  return (deal.get(zone) ?? []).filter((c) => ENCOUNTER_KINDS[type].includes(c.kind)).map((c) => c.id);
}

const quote = (c: Challenge): L => ({ en: `“${c.concept.en}”`, fr: `« ${c.concept.fr} »` });

function list(items: string[], and: string): string {
  return items.length <= 1 ? items.join('') : `${items.slice(0, -1).join(', ')} ${and} ${items[items.length - 1]}`;
}

/**
 * What the guide of `npcId` teaches: a briefing listing the zone's concepts, then one lesson
 * per concept (a nudge before you solve it, the full explanation once you have).
 */
export function guideLines(
  content: LandContent,
  npcId: string,
  markers: Marker[],
  deal: ZoneDeal,
  solved: Set<string>,
): { briefing: DialogueLine[]; lessons: DialogueLine[] } {
  const npc = content.npcs[npcId];
  const speaker = npc?.first[0]?.speaker;
  const line = (en: string, fr: string): DialogueLine => ({ portrait: npc?.frame, speaker, text: { en, fr } });
  const briefing: DialogueLine[] = [];
  const lessons: DialogueLine[] = [];

  for (const zone of content.zones.filter((z) => z.guide === npcId)) {
    const concepts = deal.get(zone) ?? [];
    if (!concepts.length) continue;
    const tiers = [...new Set(markers.filter((m) => m.type === 'monster' && zoneAt(content, m.x, m.y) === zone).map((m) => m.tier ?? 1))].sort();
    const names = tiers.map((t) => content.monsters[t as 1 | 2 | 3].name);
    const chest = markers.some((m) => m.type === 'chest' && zoneAt(content, m.x, m.y) === zone);
    const whoEn = [names.length ? `the monsters (${names.map((n) => n.en).join(', ')})` : '', chest ? 'the chest' : ''].filter(Boolean).join(' and ');
    const whoFr = [names.length ? `les monstres (${names.map((n) => n.fr).join(', ')})` : '', chest ? 'le coffre' : ''].filter(Boolean).join(' et ');
    briefing.push(
      line(
        `Here in ${zone.name.en}, ${whoEn || 'people'} can ask you about ${list(concepts.map((c) => quote(c).en), 'and')}. Talk to me again and I will teach you each of them.`,
        `Ici, dans ${zone.name.fr}, ${whoFr || 'on'} peut t’interroger sur ${list(concepts.map((c) => quote(c).fr), 'et')}. Reviens me parler et je t’apprendrai chacun d’eux.`,
      ),
    );
    for (const c of concepts) {
      lessons.push(
        solved.has(c.id)
          ? line(`You mastered ${quote(c).en} ✓. Remember: ${c.explanation.en}`, `Tu maîtrises ${quote(c).fr} ✓. Retiens bien : ${c.explanation.fr}`)
          : line(`Let me teach you about ${quote(c).en}. Think about this: ${c.hint.en}`, `Je vais t’apprendre ${quote(c).fr}. Réfléchis à ceci : ${c.hint.fr}`),
      );
    }
  }
  return { briefing, lessons };
}

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
  const left = shuffle([...CHALLENGES_BY_TRACK[content.id]]);
  const deal: ZoneDeal = new Map(content.zones.map((z) => [z, []]));
  const has = (z: ZoneDef, type: Marker['type']) => markers.some((m) => m.type === type && zoneAt(content, m.x, m.y) === z);
  const take = (z: ZoneDef, kinds: Challenge['kind'][]) => {
    const i = left.findIndex((c) => z.tiers.includes(c.tier) && kinds.includes(c.kind));
    if (i >= 0) deal.get(z)!.push(...left.splice(i, 1));
  };

  // Every chest and every group of monsters first gets one question it can actually ask…
  for (const z of content.zones) {
    if (has(z, 'chest')) take(z, ENCOUNTER_KINDS.chest);
    if (has(z, 'monster')) take(z, ENCOUNTER_KINDS.monster);
  }
  // …then the rest go to the least loaded zone of a matching difficulty.
  for (const c of left) {
    const fits = content.zones.filter((z) => z.tiers.includes(c.tier));
    const pool = fits.length ? fits : content.zones;
    const fewest = Math.min(...pool.map((z) => deal.get(z)!.length));
    const choices = pool.filter((z) => deal.get(z)!.length === fewest);
    deal.get(choices[Math.floor(Math.random() * choices.length)])!.push(c);
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

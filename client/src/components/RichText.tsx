/** Renders `backtick` spans from content strings as inline code. */
export function RichText({ text }: { text: string }) {
  const parts = text.split(/`([^`]+)`/g);
  return (
    <>
      {parts.map((p, i) =>
        i % 2 === 1 ? (
          <code key={i} className="mx-0.5 bg-arcade-deep px-1.5 py-0.5 text-[0.85em] text-neon-green">
            {p}
          </code>
        ) : (
          p
        ),
      )}
    </>
  );
}

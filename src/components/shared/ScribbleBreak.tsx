/**
 * ScribbleBreak · atmospheric break mit handgezogener wavy line statt gerader.
 * Ersetzt das alte h-px bg-ink/10 pattern · gibt jedem abschnitt einen leichten
 * sketchbook-touch ohne die composition zu brechen.
 */

type Props = {
  text: string;
  rotate?: number;
  flip?: boolean;
};

export function ScribbleBreak({ text, rotate = -1, flip = false }: Props) {
  return (
    <div className="container-site py-2">
      <div className="flex items-center gap-4 md:gap-6">
        <ScribbleLine />
        <p
          className="font-hand text-[19px] text-offwhite/30 shrink-0"
          style={{ transform: `rotate(${rotate}deg)` }}
        >
          {text}
        </p>
        <ScribbleLine flip={!flip} />
      </div>
    </div>
  );
}

function ScribbleLine({ flip = false }: { flip?: boolean }) {
  return (
    <svg
      aria-hidden
      className="flex-1 h-[8px] min-w-0"
      viewBox="0 0 300 8"
      preserveAspectRatio="none"
      style={{ transform: flip ? "scaleX(-1)" : undefined }}
    >
      <path
        d="M 0 4 Q 30 2 60 4 T 120 4 T 180 4 T 240 4 T 300 4"
        stroke="currentColor"
        strokeWidth="1"
        fill="none"
        className="text-ink/15"
        strokeLinecap="round"
      />
    </svg>
  );
}

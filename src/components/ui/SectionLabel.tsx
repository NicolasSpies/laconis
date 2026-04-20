type Props = {
  num?: string;
  children: React.ReactNode;
};

export function SectionLabel({ num, children }: Props) {
  return (
    <div className="flex items-center gap-3">
      <span className="inline-block w-2 h-2 rounded-full bg-lime" />
      {num && (
        <span className="font-mono text-[10px] text-offwhite/35 tracking-label uppercase">
          {num}
        </span>
      )}
      <span className="font-mono text-[11px] text-offwhite/55 tracking-label uppercase">
        {children}
      </span>
      <span className="h-px flex-1 bg-ink/10" />
    </div>
  );
}

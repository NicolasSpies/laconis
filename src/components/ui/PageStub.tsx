import { Button } from "./Button";

type Props = {
  titel: string;
  beschreibung: string;
};

export function PageStub({ titel, beschreibung }: Props) {
  return (
    <section className="min-h-[80vh] pt-36 pb-24">
      <div className="container-site">
        <h1 className="mt-6 heading-display text-[clamp(2.5rem,8vw,6rem)] text-offwhite">
          {titel}
        </h1>
        <p className="mt-6 max-w-[600px] text-[15px] leading-relaxed text-offwhite/55">
          {beschreibung}
        </p>
        <div className="mt-10 flex gap-3 flex-wrap">
          <Button href="/" variant="ghost">
            ← zur startseite
          </Button>
          <Button href="/kontakt#projekt">projekt starten →</Button>
        </div>
      </div>
    </section>
  );
}

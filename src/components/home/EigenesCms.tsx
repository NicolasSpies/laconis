import Link from "next/link";

/**
 * EigenesCms · der einzige moment auf der startseite, der etwas
 * behauptet.
 *
 * er steht bewusst NACH den arbeiten. erst zeigen, dann erklären ·
 * andersherum verkauft man jemandem etwas, der noch nicht weiss, ob
 * er es gut findet.
 *
 * hier standen drei zahlen: erweiterungen 0, anbieter 1, fremdes
 * javascript 0 kb. abzählbar, ehrlich · und vollkommen egal. das ist
 * die argumentation eines entwicklers gegenüber einem anderen
 * entwickler. wer eine website braucht, fragt sich, ob er sie selbst
 * ändern kann, ob ein abo dranhängt und wem sie am ende gehört.
 * genau das steht jetzt da, in einem satz.
 *
 * KEINE dopplung mit /leistung: dort steht der volle vergleich zum
 * durchschalten. die home sagt DASS, /leistung zeigt WIE.
 */

export type CmsT = {
  h2a: string;
  h2b: string;
  zeile: string;
  key: string;
};

export function EigenesCms({ t, href }: { t: CmsT; href: string }) {
  return (
    <section className="cc" data-no-reveal>
      <div className="cc-innen">
        <h2 className="cc-h2">
          {t.h2a}
          <br />
          <span className="cc-akzent">{t.h2b}</span>
        </h2>

        <p className="cc-zeile">{t.zeile}</p>

        <Link href={href} className="cc-key">
          {t.key}
        </Link>
      </div>
    </section>
  );
}

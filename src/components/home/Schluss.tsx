import Link from "next/link";
import { Kamm } from "@/components/shared/Kamm";
import "@/components/home/schluss.css";

/**
 * Schluss · die Lime-Vollplatte.
 *
 * die EINZIGE grosse lime-flaeche der ganzen seite. deshalb knallt
 * sie · haette jede zweite sektion sie, waere sie tapete.
 *
 * lime als FLAECHE hinter dunklem text ist der einsatz, fuer den die
 * farbe gemacht ist · sie wird hier nicht abgewandelt, nicht
 * abgedunkelt, nicht mit deckkraft gebrochen. #e1fd52 pur, ink
 * darauf, kontrast 15:1.
 *
 * ein satz, die mailadresse als marke, ein knopf. kein formular ·
 * das lebt auf /kontakt und darf sich nicht doppeln.
 */

export type SchlussT = {
  satz: string;
  key: string;
  oder: string;
};

export function Schluss({
  t,
  href,
  mail,
  fuss,
}: {
  t: SchlussT;
  href: string;
  mail: string;
  /** die fusszeile sitzt IN der platte · sonst endet die seite auf
      einem grauen streifen unter der farbe statt auf der farbe */
  fuss?: React.ReactNode;
}) {
  return (
    <>
      {/* der kamm sitzt VOR der platte, nicht darin · er ist die
          kante zwischen der dunklen sektion darüber und dem lime
          darunter. sein ton ist deshalb genau die plattenfarbe. */}
      <Kamm ton="#e1fd52" />

      <section className="sl" data-no-reveal>
        <div className="sl-innen">
          <p className="sl-satz">{t.satz}</p>

          <div className="sl-tat">
            <Link href={href} className="lab-cta lab-cta--invers">
              {t.key}
            </Link>
            <span className="sl-oder">
              {t.oder}{" "}
              <a href={`mailto:${mail}`} className="sl-mail">
                {mail}
              </a>
            </span>
          </div>

          {fuss}
        </div>
      </section>
    </>
  );
}

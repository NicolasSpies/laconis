import Link from "next/link";

export default function Labor() {
  return (
    <div className="lb-index">
      <h1>drei richtungen.</h1>
      <p>Gleiche Inhalte, drei Handschriften. Klick dich durch und sag, welche trägt.</p>
      <ul>
        <li>
          <Link href="/labor/a">
            <b>a · die seite schreibt sich um</b>
            Jeder Text ist editierbar. Der Besucher schreibt deine Startseite um.
            Einzigartig, ist dein Produkt, braucht fast keine Copy.
          </Link>
        </li>
        <li>
          <Link href="/labor/b">
            <b>b · radikales editorial</b>
            Schrift auf 20vw, ein durchgehender Scroll, keine Sektionen, keine Listen.
            Text als Bild. Sicher und sehr 2026 · aber austauschbar.
          </Link>
        </li>
        <li>
          <Link href="/labor/c">
            <b>c · kinematisch</b>
            Deine Projekte als angestrahlte Objekte im Raum, die Kamera fährt beim
            Scrollen. Am beeindruckendsten · und mit drei Projekten am dünnsten.
          </Link>
        </li>
      </ul>
    </div>
  );
}

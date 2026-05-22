"use client";

import { SectionLabel } from "@/components/ui/SectionLabel";
import { useLocale, pick } from "@/i18n/useLocale";
import type { Locale } from "@/i18n/config";

type Stufe = { name: string; preis: string; pro: string; was: string };
type Row = { thema: string; shared: string; laconis: string };

type Dict = {
  sectionLabel: string;
  h2pre: string;
  h2post: string;
  intro: string;
  archLabel: string;
  archH3pre: string;
  archH3post: string;
  archIntro: string;
  backendLabel: string;
  backendH4: string;
  backendItems: string[];
  frontendLabel: string;
  frontendH4: string;
  frontendItems: string[];
  vergleichLabel: string;
  vergleichH3pre: string;
  vergleichH3post: string;
  vergleichIntro: string;
  themaLabel: string;
  sharedLabel: string;
  edgeLabel: string;
  preiseLabel: string;
  preiseH3pre: string;
  preiseH3post: string;
  stufen: Stufe[];
  rows: Row[];
  diagram: {
    step1: string;
    step2: string;
    step3: string;
    ueberschrift: string;
    text: string;
    brot: string;
    seit1: string;
    seit2: string;
    speichern: string;
    apiCall: string;
    apiSub: string;
    sortiment: string;
    live: string;
    bottom: string;
  };
};

const DICT: Record<Locale, Dict> = {
  de: {
    sectionLabel: "hosting",
    h2pre: "du änderst was.",
    h2post: "besucher sehen es sofort.",
    intro: "Dein CMS, eine saubere API, die öffentliche Seite. Drei Ebenen auf zwei Infrastrukturen: VPS in Litauen für ContentCore, globale Edge-Cloud für die öffentliche Seite. Kein geteilter Server, keine Nachbarn, kein Shared-Hosting-Lotto.",
    archLabel: "architektur · zwei getrennte infrastrukturen",
    archH3pre: "contentcore sitzt auf dem VPS.",
    archH3post: "deine website sitzt auf der edge.",
    archIntro: "Das Backend hat andere Bedürfnisse als das Frontend. Ich trenne beides bewusst, damit jede Ebene genau das bekommt, was sie braucht.",
    backendLabel: "backend · VPS",
    backendH4: "contentcore auf hostinger cloud KVM · litauen (EU)",
    backendItems: [
      "· Eigene Maschine, dedizierte CPU und RAM",
      "· PostgreSQL auf demselben Server, kein Netzwerk-Hop bei Datenbankzugriffen",
      "· EU-Standort, DSGVO-konform, kein US-Cloud-Routing",
      "· Firewall, SSH-Key-only, fail2ban, UFW",
      "· Tägliche automatische Backups (Datenbank + Uploads)",
      "· Zero-Downtime-Deployments mit PM2-Cluster",
    ],
    frontendLabel: "frontend · cloud edge",
    frontendH4: "next.js statisch auf globaler edge",
    frontendItems: [
      "· Deine Seite liegt an hunderten Standorten weltweit",
      "· Besucher in Berlin holt sie aus Frankfurt, in Brüssel aus Brüssel, in Paris aus Paris",
      "· Statisch vor-gerendert, keine PHP-Runtime, keine Datenbank-Abfrage beim Pageload",
      "· Auto-Skalierung: 10 oder 10.000 Besucher gleichzeitig, derselbe Load",
      "· HTTPS überall, immutable Asset-URLs, Cache 1 Jahr",
      "· Änderung im CMS? Automatischer Revalidate-Webhook, Seite ist in Sekunden aktuell",
    ],
    vergleichLabel: "vergleich · shared hosting vs. dedizierte infrastruktur",
    vergleichH3pre: "warum shared hosting",
    vergleichH3post: "für eine ernsthafte website keine option ist.",
    vergleichIntro: "10 € pro Monat klingt günstig, bis du siehst, was in den 10 € fehlt. Hier der direkte Vergleich.",
    themaLabel: "thema",
    sharedLabel: "shared hosting",
    edgeLabel: "VPS + edge",
    preiseLabel: "preise · hosting als monatsbeitrag",
    preiseH3pre: "drei stufen.",
    preiseH3post: "du zahlst nur für das, was du brauchst.",
    stufen: [
      { name: "onepager", preis: "20 €", pro: "monat", was: "Eine Seite, Edge-Cloud, tägliches Backup." },
      { name: "multipager", preis: "30 €", pro: "monat", was: "Bis zehn Seiten, mehr Last-Reserve, gleiche Stabilität." },
      { name: "mit CMS", preis: "40 €", pro: "monat", was: "ContentCore auf eigener VPS-Instanz, Admin-Zugang für dich." },
    ],
    rows: [
      { thema: "nachbarn", shared: "100 – 1.000 fremde Kunden auf demselben Blech, jeder klaut Leistung.", laconis: "Eigener VPS nur für deine ContentCore-Instanz. Kein Nachbar, keine Ablenkung." },
      { thema: "CPU & RAM", shared: "Überbucht. Wenn der Nachbar Traffic hat, wird deine Seite langsam.", laconis: "Dedizierte Ressourcen, garantiert, immer da." },
      { thema: "IP-adresse", shared: "Geteilte IP. Wenn ein Nachbar Spam oder Malware verteilt, landest du mit auf Blacklists.", laconis: "Eigene IP. Reputation gehört dir." },
      { thema: "frontend-speed", shared: "Ein Server in irgendeinem Rechenzentrum bedient jeden Besucher weltweit.", laconis: "Frontend läuft auf globaler Edge. Besucher in Brüssel bekommt die Seite aus Brüssel." },
      { thema: "PHP vs. statisch", shared: "Jeder Pageload rechnet PHP, fragt Datenbank ab, macht neun Plugin-Hooks.", laconis: "Seite ist vor-gerendert. Auslieferung ist reine Datei, kein Rechenvorgang." },
      { thema: "skalierung", shared: "Virales Posting legt die Seite lahm. Hoster meldet sich am nächsten Werktag.", laconis: "Edge skaliert automatisch. 10 oder 10.000 Besucher gleichzeitig, derselbe Load." },
      { thema: "wartung", shared: "Sicherheits-Updates sind deine Sache, oft vergessen, oft zu spät.", laconis: "Ich update automatisch im Hintergrund. Du merkst davon nichts." },
      { thema: "datenhoheit", shared: "Oft US-Unternehmen mit Multi-Hop-Routing. Datenschutz: Glücksspiel.", laconis: "VPS in Litauen (EU), Edge mit EU-Routing. DSGVO von Anfang an." },
    ],
    diagram: {
      step1: "01 · du bearbeitest",
      step2: "02 · daten reisen",
      step3: "03 · besucher sieht",
      ueberschrift: "überschrift",
      text: "text",
      brot: "brot das riecht",
      seit1: "seit 1962, jeden morgen",
      seit2: "ab vier uhr. frisch.",
      speichern: "speichern",
      apiCall: "GET /inhalt",
      apiSub: "verschlüsselt · schnell · automatisch",
      sortiment: "sortiment →",
      live: "live",
      bottom: "hostinger cloud · eigene instanz · tägliche backups · SSL · monitoring",
    },
  },
  fr: {
    sectionLabel: "hébergement",
    h2pre: "tu changes un truc.",
    h2post: "les visiteurs le voient direct.",
    intro: "Ton CMS, une API propre, le site public. Trois niveaux sur deux infrastructures : VPS en Lituanie pour ContentCore, edge-cloud globale pour le site public. Pas de serveur partagé, pas de voisins, pas de loto shared-hosting.",
    archLabel: "architecture · deux infrastructures séparées",
    archH3pre: "contentcore vit sur le VPS.",
    archH3post: "ton site vit sur l'edge.",
    archIntro: "Le backend n'a pas les mêmes besoins que le frontend. Je sépare exprès, pour que chaque niveau ait pile ce qu'il faut.",
    backendLabel: "backend · VPS",
    backendH4: "contentcore sur hostinger cloud KVM · lituanie (UE)",
    backendItems: [
      "· Machine propre, CPU et RAM dédiés",
      "· PostgreSQL sur le même serveur, pas de saut réseau pour les requêtes",
      "· Localisation UE, conforme RGPD, pas de routing US-cloud",
      "· Firewall, SSH-key only, fail2ban, UFW",
      "· Sauvegardes automatiques quotidiennes (BDD + uploads)",
      "· Déploiements sans downtime avec cluster PM2",
    ],
    frontendLabel: "frontend · cloud edge",
    frontendH4: "next.js statique sur edge globale",
    frontendItems: [
      "· Ton site est sur des centaines de points dans le monde",
      "· Visiteur à Berlin le récupère à Francfort, à Bruxelles à Bruxelles, à Paris à Paris",
      "· Pré-rendu en statique, pas de runtime PHP, pas de requête BDD au pageload",
      "· Auto-scaling : 10 ou 10 000 visiteurs en même temps, même charge",
      "· HTTPS partout, URLs d'assets immutables, cache 1 an",
      "· Modif dans le CMS ? Webhook de revalidate automatique, le site est à jour en quelques secondes",
    ],
    vergleichLabel: "comparatif · shared hosting vs. infra dédiée",
    vergleichH3pre: "pourquoi le shared hosting",
    vergleichH3post: "n'est pas une option pour un vrai site.",
    vergleichIntro: "10 € par mois ça a l'air pas cher, jusqu'à ce que tu voies ce qui manque dans les 10 €. Le comparatif direct.",
    themaLabel: "thème",
    sharedLabel: "shared hosting",
    edgeLabel: "VPS + edge",
    preiseLabel: "prix · hébergement en mensualité",
    preiseH3pre: "trois niveaux.",
    preiseH3post: "tu payes juste ce dont tu as besoin.",
    stufen: [
      { name: "onepage", preis: "20 €", pro: "mois", was: "Un site, edge-cloud, backup quotidien." },
      { name: "multi-pages", preis: "30 €", pro: "mois", was: "Jusqu'à dix pages, plus de réserve de charge, même stabilité." },
      { name: "avec CMS", preis: "40 €", pro: "mois", was: "ContentCore sur instance VPS dédiée, accès admin pour toi." },
    ],
    rows: [
      { thema: "voisins", shared: "100 – 1 000 clients étrangers sur la même tôle, chacun pique de la perf.", laconis: "VPS propre rien que pour ton instance ContentCore. Pas de voisin, pas de distraction." },
      { thema: "CPU & RAM", shared: "Surbookés. Si le voisin a du trafic, ton site ralentit.", laconis: "Ressources dédiées, garanties, toujours là." },
      { thema: "adresse IP", shared: "IP partagée. Si un voisin envoie du spam ou du malware, tu te retrouves blacklisté avec.", laconis: "IP propre. Ta réputation t'appartient." },
      { thema: "vitesse frontend", shared: "Un serveur dans un datacenter random sert chaque visiteur dans le monde.", laconis: "Frontend tourne sur edge globale. Visiteur à Bruxelles reçoit le site depuis Bruxelles." },
      { thema: "PHP vs. statique", shared: "Chaque pageload calcule du PHP, interroge la BDD, lance neuf hooks plugin.", laconis: "Le site est pré-rendu. La livraison c'est un fichier, pas un calcul." },
      { thema: "scaling", shared: "Un post viral plombe le site. L'hébergeur répond le prochain jour ouvré.", laconis: "L'edge scale tout seul. 10 ou 10 000 visiteurs en même temps, même charge." },
      { thema: "maintenance", shared: "Les updates sécu c'est ton problème, souvent oubliées, souvent trop tard.", laconis: "Je fais les updates auto en arrière-plan. Tu vois rien." },
      { thema: "souveraineté des données", shared: "Souvent une boîte US avec routing multi-hop. Protection des données : loterie.", laconis: "VPS en Lituanie (UE), edge avec routing UE. RGPD dès le début." },
    ],
    diagram: {
      step1: "01 · tu édites",
      step2: "02 · les données voyagent",
      step3: "03 · visiteur voit",
      ueberschrift: "titre",
      text: "texte",
      brot: "pain qui sent bon",
      seit1: "depuis 1962, chaque matin",
      seit2: "dès quatre heures. frais.",
      speichern: "enregistrer",
      apiCall: "GET /contenu",
      apiSub: "chiffré · rapide · automatique",
      sortiment: "produits →",
      live: "live",
      bottom: "hostinger cloud · instance propre · backups quotidiens · SSL · monitoring",
    },
  },
  en: {
    sectionLabel: "hosting",
    h2pre: "you change something.",
    h2post: "visitors see it instantly.",
    intro: "Your CMS, a clean API, the public site. Three layers on two infrastructures: VPS in Lithuania for ContentCore, global edge cloud for the public site. No shared server, no neighbours, no shared-hosting lottery.",
    archLabel: "architecture · two separate infrastructures",
    archH3pre: "contentcore lives on the VPS.",
    archH3post: "your site lives on the edge.",
    archIntro: "The backend has different needs than the frontend. I separate them on purpose so each layer gets exactly what it needs.",
    backendLabel: "backend · VPS",
    backendH4: "contentcore on hostinger cloud KVM · lithuania (EU)",
    backendItems: [
      "· Own machine, dedicated CPU and RAM",
      "· PostgreSQL on the same server, no network hop for database queries",
      "· EU location, GDPR-compliant, no US cloud routing",
      "· Firewall, SSH-key only, fail2ban, UFW",
      "· Daily automatic backups (database + uploads)",
      "· Zero-downtime deployments with PM2 cluster",
    ],
    frontendLabel: "frontend · cloud edge",
    frontendH4: "next.js static on global edge",
    frontendItems: [
      "· Your site sits at hundreds of locations worldwide",
      "· Visitor in Berlin gets it from Frankfurt, in Brussels from Brussels, in Paris from Paris",
      "· Statically pre-rendered, no PHP runtime, no database query on pageload",
      "· Auto-scaling: 10 or 10,000 visitors at the same time, same load",
      "· HTTPS everywhere, immutable asset URLs, 1-year cache",
      "· Change in the CMS? Automatic revalidate webhook, the site is current in seconds",
    ],
    vergleichLabel: "compare · shared hosting vs. dedicated infrastructure",
    vergleichH3pre: "why shared hosting",
    vergleichH3post: "is not an option for a serious website.",
    vergleichIntro: "10 € a month sounds cheap, until you see what's missing in the 10 €. Here's the direct comparison.",
    themaLabel: "topic",
    sharedLabel: "shared hosting",
    edgeLabel: "VPS + edge",
    preiseLabel: "pricing · hosting as a monthly fee",
    preiseH3pre: "three tiers.",
    preiseH3post: "you only pay for what you need.",
    stufen: [
      { name: "onepager", preis: "20 €", pro: "month", was: "One page, edge cloud, daily backup." },
      { name: "multipager", preis: "30 €", pro: "month", was: "Up to ten pages, more load reserve, same stability." },
      { name: "with CMS", preis: "40 €", pro: "month", was: "ContentCore on its own VPS instance, admin access for you." },
    ],
    rows: [
      { thema: "neighbours", shared: "100 – 1,000 strangers on the same tin, each one stealing performance.", laconis: "Own VPS just for your ContentCore instance. No neighbour, no distraction." },
      { thema: "CPU & RAM", shared: "Overbooked. When the neighbour gets traffic, your site slows down.", laconis: "Dedicated resources, guaranteed, always there." },
      { thema: "IP address", shared: "Shared IP. If a neighbour sends spam or malware, you land on the blacklists with them.", laconis: "Own IP. The reputation belongs to you." },
      { thema: "frontend speed", shared: "One server in some random datacentre serving every visitor worldwide.", laconis: "Frontend runs on global edge. Visitor in Brussels gets the site from Brussels." },
      { thema: "PHP vs. static", shared: "Every pageload runs PHP, queries the database, fires nine plugin hooks.", laconis: "Site is pre-rendered. Delivery is a pure file, not a computation." },
      { thema: "scaling", shared: "A viral post crushes the site. Host responds the next business day.", laconis: "Edge scales automatically. 10 or 10,000 visitors at once, same load." },
      { thema: "maintenance", shared: "Security updates are your problem, often forgotten, often too late.", laconis: "I update automatically in the background. You don't notice a thing." },
      { thema: "data sovereignty", shared: "Often a US company with multi-hop routing. Privacy: gamble.", laconis: "VPS in Lithuania (EU), edge with EU routing. GDPR from day one." },
    ],
    diagram: {
      step1: "01 · you edit",
      step2: "02 · data travels",
      step3: "03 · visitor sees",
      ueberschrift: "headline",
      text: "text",
      brot: "bread that smells",
      seit1: "since 1962, every morning",
      seit2: "from four o'clock. fresh.",
      speichern: "save",
      apiCall: "GET /content",
      apiSub: "encrypted · fast · automatic",
      sortiment: "range →",
      live: "live",
      bottom: "hostinger cloud · own instance · daily backups · SSL · monitoring",
    },
  },
};

function ServerDiagram({ d }: { d: Dict["diagram"] }) {
  return (
    <svg
      viewBox="0 0 760 280"
      className="w-full h-auto"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="CMS → API → frontend"
    >
      <g stroke="rgb(var(--accent) / 0.3)" strokeWidth="1" strokeDasharray="3 3">
        <line x1="220" y1="140" x2="300" y2="140" />
        <line x1="460" y1="140" x2="540" y2="140" />
      </g>
      <g>
        <circle r="3" fill="rgb(var(--accent))">
          <animateMotion dur="2.4s" repeatCount="indefinite" path="M 220 140 L 300 140" />
        </circle>
        <circle r="2" fill="rgb(var(--accent))" opacity="0.6">
          <animateMotion dur="2.4s" begin="0.8s" repeatCount="indefinite" path="M 220 140 L 300 140" />
        </circle>
        <circle r="3" fill="rgb(var(--accent))">
          <animateMotion dur="2.4s" repeatCount="indefinite" path="M 460 140 L 540 140" />
        </circle>
        <circle r="2" fill="rgb(var(--accent))" opacity="0.6">
          <animateMotion dur="2.4s" begin="0.8s" repeatCount="indefinite" path="M 460 140 L 540 140" />
        </circle>
      </g>

      <g>
        <rect x="30" y="50" width="190" height="180" rx="12" fill="#0d0d0d" stroke="rgba(255,255,255,0.1)" />
        <text x="48" y="72" fontFamily="ui-monospace, monospace" fontSize="9" fill="rgba(242,242,242,0.4)">
          {d.step1}
        </text>
        <text x="48" y="100" fontFamily="ui-monospace, monospace" fontSize="7" fill="rgba(242,242,242,0.4)">
          {d.ueberschrift}
        </text>
        <rect x="48" y="106" width="154" height="22" rx="3" fill="#050505" stroke="rgba(255,255,255,0.08)" />
        <text x="56" y="121" fontFamily="system-ui, sans-serif" fontSize="11" fontWeight="700" fill="#F2F2F2">
          {d.brot}
        </text>
        <rect x="122" y="110" width="1.5" height="15" fill="rgb(var(--accent))">
          <animate attributeName="opacity" values="1;0;1" dur="1.1s" repeatCount="indefinite" />
        </rect>
        <text x="48" y="150" fontFamily="ui-monospace, monospace" fontSize="7" fill="rgba(242,242,242,0.4)">
          {d.text}
        </text>
        <rect x="48" y="156" width="154" height="38" rx="3" fill="#050505" stroke="rgba(255,255,255,0.08)" />
        <text x="56" y="170" fontFamily="system-ui, sans-serif" fontSize="9" fill="rgba(242,242,242,0.6)">
          {d.seit1}
        </text>
        <text x="56" y="184" fontFamily="system-ui, sans-serif" fontSize="9" fill="rgba(242,242,242,0.6)">
          {d.seit2}
        </text>
        <rect x="48" y="204" width="70" height="18" rx="3" fill="rgb(var(--accent))" />
        <text x="83" y="216" fontFamily="ui-monospace, monospace" fontSize="8" fill="#000" textAnchor="middle" fontWeight="600">
          {d.speichern}
        </text>
        <circle cx="54" cy="213" r="3" fill="#000">
          <animate attributeName="r" values="3;5;3" dur="1.5s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="1;0.3;1" dur="1.5s" repeatCount="indefinite" />
        </circle>
      </g>

      <g>
        <rect x="300" y="50" width="160" height="180" rx="12" fill="#0d0d0d" stroke="rgb(var(--accent) / 0.28)" />
        <text x="316" y="72" fontFamily="ui-monospace, monospace" fontSize="9" fill="rgb(var(--accent) / 0.7)">
          {d.step2}
        </text>
        <g transform="translate(380, 130)">
          <circle r="42" fill="none" stroke="rgb(var(--accent) / 0.12)" strokeDasharray="2 4" />
          <circle r="30" fill="none" stroke="rgb(var(--accent) / 0.08)" />
          <text x="0" y="6" fontFamily="ui-monospace, monospace" fontSize="26" fontWeight="700" fill="rgb(var(--accent))" textAnchor="middle" letterSpacing="-0.05em">
            {"{ }"}
          </text>
          <g>
            <rect x="-4" y="-46" width="8" height="5" rx="1" fill="rgb(var(--accent))" opacity="0.8">
              <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="4s" repeatCount="indefinite" />
            </rect>
            <rect x="-4" y="-46" width="6" height="4" rx="1" fill="rgb(var(--accent))" opacity="0.5">
              <animateTransform attributeName="transform" type="rotate" from="90" to="450" dur="4s" repeatCount="indefinite" />
            </rect>
          </g>
        </g>
        <text x="380" y="200" fontFamily="ui-monospace, monospace" fontSize="8" fill="rgba(242,242,242,0.5)" textAnchor="middle">
          {d.apiCall}
        </text>
        <text x="380" y="214" fontFamily="ui-monospace, monospace" fontSize="7" fill="rgba(242,242,242,0.3)" textAnchor="middle">
          {d.apiSub}
        </text>
      </g>

      <g>
        <rect x="540" y="50" width="190" height="180" rx="12" fill="#0d0d0d" stroke="rgba(255,255,255,0.1)" />
        <text x="558" y="72" fontFamily="ui-monospace, monospace" fontSize="9" fill="rgba(242,242,242,0.4)">
          {d.step3}
        </text>
        <g>
          <rect x="558" y="88" width="154" height="130" rx="4" fill="#050505" stroke="rgba(255,255,255,0.08)" />
          <rect x="558" y="88" width="154" height="14" fill="#0a0a0a" />
          <circle cx="566" cy="95" r="1.5" fill="#2a2a2a" />
          <circle cx="572" cy="95" r="1.5" fill="#2a2a2a" />
          <circle cx="578" cy="95" r="1.5" fill="#2a2a2a" />
          <text x="566" y="116" fontFamily="system-ui, sans-serif" fontSize="7" fontWeight="700" fill="#F2F2F2">
            atelier
          </text>
          <text x="590" y="116" fontFamily="system-ui, sans-serif" fontSize="7" fontWeight="700" fill="rgb(var(--accent))">
            .
          </text>
          <text x="566" y="144" fontFamily="system-ui, sans-serif" fontSize="12" fontWeight="900" fill="#F2F2F2" letterSpacing="-0.03em">
            {d.brot}
          </text>
          <rect x="566" y="152" width="120" height="2.5" rx="1" fill="rgba(242,242,242,0.25)" />
          <rect x="566" y="158" width="100" height="2.5" rx="1" fill="rgba(242,242,242,0.25)" />
          <rect x="566" y="170" width="60" height="14" rx="2" fill="rgb(var(--accent))" />
          <text x="596" y="180" fontFamily="ui-monospace, monospace" fontSize="6" fill="#000" textAnchor="middle" fontWeight="600">
            {d.sortiment}
          </text>
          <circle cx="704" cy="110" r="2" fill="rgb(var(--accent))">
            <animate attributeName="opacity" values="0.3;1;0.3" dur="1.4s" repeatCount="indefinite" />
          </circle>
          <text x="700" y="113" fontFamily="ui-monospace, monospace" fontSize="6" fill="rgb(var(--accent) / 0.9)" textAnchor="end">
            {d.live}
          </text>
          <rect x="566" y="198" width="140" height="14" rx="2" fill="url(#frontend-photo)" />
          <defs>
            <linearGradient id="frontend-photo" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#d28c46" />
              <stop offset="1" stopColor="#3a2414" />
            </linearGradient>
          </defs>
        </g>
      </g>

      <text x="380" y="264" fontFamily="ui-monospace, monospace" fontSize="9" fill="rgba(242,242,242,0.35)" textAnchor="middle">
        {d.bottom}
      </text>
    </svg>
  );
}

export function HostingBlock({ num = "06" }: { num?: string } = {}) {
  const locale = useLocale();
  const t = pick(DICT, locale);
  return (
    <section className="pb-32">
      <div className="container-site">
        <div className="max-w-[720px]">
          <SectionLabel num={num}>{t.sectionLabel}</SectionLabel>
          <h2 className="heading-display mt-4 text-[clamp(2rem,5.5vw,3.75rem)] text-offwhite">
            {t.h2pre}{" "}
            <span className="text-offwhite/35">{t.h2post}</span>
          </h2>
          <p className="mt-6 max-w-[620px] text-[15px] leading-relaxed text-offwhite/55">
            {t.intro}
          </p>
        </div>

        <div className="mt-14 glass rounded-2xl p-6 md:p-10">
          <ServerDiagram d={t.diagram} />
        </div>

        <div className="mt-20 max-w-[820px]">
          <span className="font-mono text-[11px] uppercase tracking-label text-offwhite/35">
            {t.archLabel}
          </span>
          <h3 className="heading-display mt-3 text-[clamp(1.5rem,3.5vw,2.25rem)] text-offwhite">
            {t.archH3pre}{" "}
            <span className="text-offwhite/35">
              {t.archH3post}
            </span>
          </h3>
          <p className="mt-5 max-w-[620px] text-[14px] leading-relaxed text-offwhite/55">
            {t.archIntro}
          </p>
        </div>

        <div className="mt-10 grid md:grid-cols-2 gap-4">
          <div className="glass rounded-xl p-6">
            <span className="font-mono text-[10px] uppercase tracking-label text-accent-ink">
              {t.backendLabel}
            </span>
            <h4 className="heading-sans text-[18px] text-offwhite mt-3">
              {t.backendH4}
            </h4>
            <ul className="mt-4 space-y-2 text-[13px] text-offwhite/55 leading-relaxed">
              {t.backendItems.map((item, i) => (<li key={i}>{item}</li>))}
            </ul>
          </div>
          <div className="glass rounded-xl p-6">
            <span className="font-mono text-[10px] uppercase tracking-label text-accent-ink">
              {t.frontendLabel}
            </span>
            <h4 className="heading-sans text-[18px] text-offwhite mt-3">
              {t.frontendH4}
            </h4>
            <ul className="mt-4 space-y-2 text-[13px] text-offwhite/55 leading-relaxed">
              {t.frontendItems.map((item, i) => (<li key={i}>{item}</li>))}
            </ul>
          </div>
        </div>

        <div className="mt-24 max-w-[820px]">
          <span className="font-mono text-[11px] uppercase tracking-label text-offwhite/35">
            {t.vergleichLabel}
          </span>
          <h3 className="heading-display mt-3 text-[clamp(1.5rem,3.5vw,2.25rem)] text-offwhite">
            {t.vergleichH3pre}{" "}
            <span className="text-offwhite/35">
              {t.vergleichH3post}
            </span>
          </h3>
          <p className="mt-5 max-w-[620px] text-[14px] leading-relaxed text-offwhite/55">
            {t.vergleichIntro}
          </p>
        </div>

        <div className="mt-10 glass rounded-2xl overflow-hidden">
          <div className="grid grid-cols-[1fr_1fr_1fr] border-b border-ink/20 bg-ink/[0.02]">
            <div className="px-5 py-4">
              <span className="font-mono text-[10px] uppercase tracking-label text-offwhite/35">
                {t.themaLabel}
              </span>
            </div>
            <div className="px-5 py-4 border-l border-ink/20">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-red-400/60" />
                <span className="font-mono text-[11px] uppercase tracking-label text-offwhite/55">
                  {t.sharedLabel}
                </span>
              </div>
            </div>
            <div className="px-5 py-4 border-l border-ink/20">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-lime" />
                <span className="font-mono text-[11px] uppercase tracking-label text-accent-ink">
                  {t.edgeLabel}
                </span>
              </div>
            </div>
          </div>
          {t.rows.map((r, i) => (
            <div
              key={r.thema}
              className={
                "grid grid-cols-[1fr_1fr_1fr] items-start hover:bg-ink/[0.035] transition-colors" +
                (i < t.rows.length - 1 ? " border-b border-ink/5" : "")
              }
            >
              <div className="px-5 py-5">
                <span className="heading-sans text-[14px] md:text-[15px] text-offwhite">
                  {r.thema}
                </span>
              </div>
              <div className="px-5 py-5 border-l border-ink/20">
                <div className="flex items-start gap-2">
                  <span className="font-mono text-[11px] text-red-400/70 mt-0.5 shrink-0">
                    ⚠
                  </span>
                  <span className="text-[13px] leading-relaxed text-offwhite/55">
                    {r.shared}
                  </span>
                </div>
              </div>
              <div className="px-5 py-5 border-l border-ink/20">
                <div className="flex items-start gap-2">
                  <span className="font-mono text-[11px] text-accent-ink mt-0.5 shrink-0">
                    ✓
                  </span>
                  <span className="text-[13px] leading-relaxed text-offwhite/75">
                    {r.laconis}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-24 max-w-[720px]">
          <span className="font-mono text-[11px] uppercase tracking-label text-offwhite/35">
            {t.preiseLabel}
          </span>
          <h3 className="heading-display mt-3 text-[clamp(1.5rem,3.5vw,2.25rem)] text-offwhite">
            {t.preiseH3pre}{" "}
            <span className="text-offwhite/35">
              {t.preiseH3post}
            </span>
          </h3>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
          {t.stufen.map((s) => (
            <div
              key={s.name}
              className="glass rounded-xl p-6 flex flex-col gap-3"
            >
              <div className="flex items-baseline justify-between">
                <h3 className="heading-sans text-[18px] text-offwhite">
                  {s.name}
                </h3>
                <div className="flex items-baseline gap-1">
                  <span className="heading-display text-[22px] text-accent-ink leading-none">
                    {s.preis}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-label text-offwhite/35">
                    / {s.pro}
                  </span>
                </div>
              </div>
              <p className="text-[13px] leading-relaxed text-offwhite/55">
                {s.was}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import type { CandidateBlock } from "../components/organisms/candidate-detail";
import type { SocialLink } from "../components/molecules/social-row";

export interface Candidate {
  slug: string;
  name: string;
  image: string;
  imageAlt: string;
  subtitle: string;
  meta: string[];
  followLabel: string;
  socials: SocialLink[];
  blocks: CandidateBlock[];
}

export const PAUL: Candidate = {
  slug: "paul-loeper",
  name: "Paul Löper",
  image: "/pics/spitzen/paulMain.png",
  imageAlt: "Paul Löper",
  subtitle: "Kandidierende zur Wahl des AGH 2026 / Listenplatz 2",
  meta: [
    "Kandidat der Landesliste Volt Berlin",
    "Listenplatz: 2 | Alter: 36 | Bezirk: Pankow",
  ],
  followLabel: "Folge Paul",
  socials: [
    { platform: "linkedin", href: "https://de.linkedin.com/in/paul-loeper" },
    { platform: "instagram", href: "https://www.instagram.com/paul.loeper.eu/" },
  ],
  blocks: [
    {
      heading: "Herzensthema",
      body: "Ich will Berlin zu einem Leuchtturm der Hoffnung für eine innovative, gerechte und nachhaltige europäische Zukunft machen. Eine Stadt, die wächst und sich selbstbewusst als europäische Vorreiterstadt sieht.",
    },
    {
      heading: "Beruf",
      body: "Ich arbeite als Organisations- und IT-Berater für den öffentlichen Sektor. Mein Fokus: Prozesse vereinfachen, Digitalisierung umsetzen und Projekte ins Ziel bringen.",
    },
    {
      heading: "Biographie",
      body: "Ich bin mit drei Schwestern in Hannover aufgewachsen und 2011, nach meinem Grundwehrdienst, nach Berlin gezogen. Hier habe ich Betriebswirtschaft studiert und von 2017 bis 2021 als Mitgründer das Team von Volt Europa in Deutschland aufgebaut.",
    },
    {
      heading: "Politische Motivation",
      body: "Ich bin bei Volt, weil ich der Überzeugung bin, dass Politik Vision und grenzübergreifendes Handeln braucht. Ich will, dass Berlin beim Wohnen, bei der Digitalisierung und der Bildung europäischer Vorreiter wird.",
    },
  ],
};

export const ANNA: Candidate = {
  slug: "anna-auerbach",
  name: "Anna Auerbach",
  image: "/pics/spitzen/annaMain.png",
  imageAlt: "Anna Auerbach",
  subtitle: "Kandidierende zur Wahl des AGH 2026 / Listenplatz 1",
  meta: [
    "Kandidatin der Landesliste Volt Berlin",
    "Listenplatz: 1 | Alter: 44 | Bezirk: Mitte",
  ],
  followLabel: "Folge Anna",
  socials: [
    { platform: "linkedin", href: "https://de.linkedin.com/in/auerbachanna" },
    { platform: "instagram", href: "https://www.instagram.com/anna.auerbach/" },
  ],
  blocks: [
    {
      heading: "Herzensthema",
      body: "Ich trete an für ein Berlin, das vorankommt: als fairer, innovativer Wirtschaftsstandort. Eine starke Wirtschaft schafft ein faires Berlin – mit bezahlbarem Wohnraum, gerechten Bildungschancen und einem solidarischen Miteinander.",
    },
    {
      heading: "Beruf",
      body: "Rechtsanwältin, derzeit mit vollem Einsatz für Volt.",
    },
    {
      heading: "Biographie",
      body: "Ich bin Anwältin, Gründerin, Mutter von zwei Kindern und einem afghanischen Ziehsohn. Voller Energie, Berlin gemeinsam mit euch in die Zukunft zu bringen.",
    },
    {
      heading: "Politische Motivation",
      body: "Ich möchte, dass sich die Menschen in dieser Stadt wieder gemeinsam für Berlin begeistern. Mein Ziel ist es, Volt ins Abgeordnetenhaus zu führen und von dort aus mit mutigen Lösungen echten Fortschritt zu schaffen. Ich bin überzeugt: Mit guter Politik können wir Vertrauen in unsere Demokratie zurückgewinnen und Berlin wieder zusammenbringen.",
    },
  ],
};

export const SPITZENKANDIDATEN: Candidate[] = [ANNA, PAUL];

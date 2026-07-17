export interface Kandidat {
  name: string
  /** Slug from the source href (/kandidierende/<slug>). */
  slug: string
  listenplatz: number
  bezirk: string
  /** Portrait image (local, /public/pics/kandis). */
  image: string
}

/**
 * Landesliste Volt Berlin, AGH-Wahl 2026.
 * Parsed from the source candidate grid. The placeholder duplicate
 * "Theresa Nachname" (also Listenplatz 9) was omitted, Bezirk names normalized,
 * and portraits downloaded locally to /public/pics/kandis/<slug>.
 */
export const KANDIDATEN: Kandidat[] = [
  { name: 'Anna Auerbach', slug: 'anna-auerbach', listenplatz: 1, bezirk: 'Mitte', image: '/pics/kandis/anna-auerbach.png' },
  { name: 'Paul Loeper', slug: 'paul-loeper', listenplatz: 2, bezirk: 'Pankow', image: '/pics/kandis/paul-loeper.png' },
  { name: 'Rafael Kaaz', slug: 'rafael-kaaz', listenplatz: 3, bezirk: 'Charlottenburg-Wilmersdorf', image: '/pics/kandis/rafael-kaaz.png' },
  { name: 'Pia Voltz', slug: 'pia-voltz', listenplatz: 4, bezirk: 'Treptow-Köpenick', image: '/pics/kandis/pia-voltz.png' },
  { name: 'Jakob Johannes Welker', slug: 'jakob-johannes-welker', listenplatz: 5, bezirk: 'Friedrichshain-Kreuzberg', image: '/pics/kandis/jakob-johannes-welker.jpg' },
  { name: 'Aiga Marie Senftleben', slug: 'aiga-marie-senftleben', listenplatz: 6, bezirk: 'Pankow', image: '/pics/kandis/aiga-marie-senftleben.png' },
  { name: 'Rainer Seider', slug: 'rainer-seider', listenplatz: 7, bezirk: 'Mitte', image: '/pics/kandis/rainer-seider.png' },
  { name: 'Cara Seeberg', slug: 'cara-seeberg', listenplatz: 8, bezirk: 'Charlottenburg-Wilmersdorf', image: '/pics/kandis/cara-seeberg.png' },
  { name: 'Andrija Šarić', slug: 'andrija-saric', listenplatz: 9, bezirk: 'Mitte', image: '/pics/kandis/andrija-saric.jpg' },
  { name: 'Theresa Schültken', slug: 'theresa-schueltken', listenplatz: 10, bezirk: 'Pankow', image: '/pics/kandis/theresa-schueltken.png' },
  { name: 'Christian Weißsteiner', slug: 'christian-weisssteiner', listenplatz: 11, bezirk: 'Charlottenburg-Wilmersdorf', image: '/pics/kandis/christian-weisssteiner.png' },
  { name: 'Susanne Maria Zels', slug: 'susanne-maria-zels', listenplatz: 12, bezirk: 'Friedrichshain-Kreuzberg', image: '/pics/kandis/susanne-maria-zels.jpg' },
  { name: 'Martin Hergert', slug: 'martin-hergert', listenplatz: 13, bezirk: 'Mitte', image: '/pics/kandis/martin-hergert.jpg' },
  { name: 'Rahel Demant', slug: 'rahel-demant', listenplatz: 14, bezirk: 'Tempelhof-Schöneberg', image: '/pics/kandis/rahel-demant.png' },
  { name: 'Alexander Paulski', slug: 'alexander-paulski', listenplatz: 15, bezirk: 'Neukölln', image: '/pics/kandis/alexander-paulski.jpg' },
  { name: 'Juliane Kalbacher', slug: 'juliane-kalbacher', listenplatz: 16, bezirk: 'Charlottenburg-Wilmersdorf', image: '/pics/kandis/juliane-kalbacher.png' },
  { name: 'Ingo Partey', slug: 'ingo-partey', listenplatz: 17, bezirk: 'Steglitz-Zehlendorf', image: '/pics/kandis/ingo-partey.png' },
  { name: 'Danina Margit Schwarm', slug: 'danina-margit-schwarm', listenplatz: 18, bezirk: 'Charlottenburg-Wilmersdorf', image: '/pics/kandis/danina-margit-schwarm.png' },
  { name: 'Sascha Hellwig', slug: 'sascha-hellwig', listenplatz: 19, bezirk: 'Reinickendorf', image: '/pics/kandis/sascha-hellwig.png' },
]

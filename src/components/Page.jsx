// import { ArrowRight, Play } from "lucide-react";
// import { SEITEN, KANDIDATEN } from "../data";
// import { NL, CmsImg } from "../lib";

import { Navbar } from './Navbar'
import { Footer } from "./Footer";

import { HeroLinear } from './content_modules/HeroLinear'
import { HeroVideo } from './content_modules/HeroVideo'
import { KalenderTeaser } from './content_modules/KalenderTeaser'
import { KandisTeaser } from './content_modules/KandisTeaser'
import { UnfckTeaser } from './content_modules/UnfckTeaser'
import { WahlsystemTeaser } from './content_modules/WahlsystemTeaser'
import { Headline } from './content_modules/Headline'
import { HtmlText } from './content_modules/HtmlText'
import { OneCta } from './content_modules/OneCta'
import { WahlprogrammTeaser } from './content_modules/WahlprogrammTeaser'
import { KandisAuswahl } from './content_modules/KandisAuswahl'

export function Page({ page }) {
  // const slug = page.slug || '';
  const page_theme = page.page_theme || 'purple';
  const content_modules = page.content_modules || [];
  const isPurple = page_theme !== 'white'

  return (
    <div className="min-h-full bg-volt-purple">
      <Navbar isPurple={isPurple} />
      <main className={isPurple ? 'bg-volt-purple text-white' : 'bg-white text-volt-purple'}>
      {
        content_modules.map((obj, index) => {
          switch (obj._type) {
            case 'hero_linear':
              return <HeroLinear obj={obj} key={`${obj._key}_${index}`} />
            case 'hero_video':
              return <HeroVideo obj={obj} key={`${obj._key}_${index}`} />
            case 'kalender_teaser':
              return <KalenderTeaser obj={obj} key={`${obj._key}_${index}`} />
            case 'kandis_teaser':
              return <KandisTeaser obj={obj} key={`${obj._key}_${index}`} />
            case 'unfck_teaser':
              return <UnfckTeaser obj={obj} key={`${obj._key}_${index}`} />
            case 'wahlsystem_teaser':
              return <WahlsystemTeaser obj={obj} key={`${obj._key}_${index}`} />
            case 'headline':
              return <Headline obj={obj} key={`${obj._key}_${index}`} />
            case 'html_text':
              return <HtmlText obj={obj} key={`${obj._key}_${index}`} />
            case 'one_cta':
              return <OneCta obj={obj} key={`${obj._key}_${index}`} />
            case 'wahlprogramm_teaser':
              return <WahlprogrammTeaser obj={obj} key={`${obj._key}_${index}`} />
            case 'kandis_auswahl':
              return <KandisAuswahl obj={obj} key={`${obj._key}_${index}`} />
            default:
              return null
          }
        })
      }
      <div className="h-16" />
      </main>
      <Footer />
    </div>
  );
}

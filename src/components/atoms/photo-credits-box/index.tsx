import type { HTMLAttributes } from 'react'
import { Link } from 'react-router'

interface PhotoCreditsBoxProps extends HTMLAttributes<HTMLElement> {
  foto_originalFilename: string
}

const credits = {
  'default': {
    label: 'Foto-Credits',
    url: '/made_with_love',
  },
  '©Max_Große-Wortmann': {
    label: '© Maximillian Große-Wortmann',
    url: 'https://www.instagram.com/mgw__photography/',
  },
  '©Evelin_Frerk': {
    label: '© Evelin Frerk',
    url: 'http://www.evelinfrerk.de/index.php?bereich=KONTAKT',
  },
  '©Katja_Henschel': {
    label: '© Katja Henschel',
    url: 'https://www.katjahentschel.com/',
  },
  '©Joshua_Heitzler': {
    label: '© Joshua Heitzler',
    url: 'https://hadronsounds.com/',
  },
}

function getCredits({ filename }: { filename: string }) {
  if (!filename) {
    return credits.default
  }

  for (const matchingText of Object.keys(credits)) {
    if (filename.includes(matchingText)) {
      return credits[matchingText]
    }
  }

  return credits.default
}

export function PhotoCreditsBox({
  foto_originalFilename,
  children
}: PhotoCreditsBoxProps) {
  return (
    <div
      className="PhotoCreditsBox"
      style={{
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {children}
      <Link
        className="PhotoCreditsBoxLink hover:underline"
        to={getCredits({ filename: foto_originalFilename }).url}
        style={{
          position: 'absolute',
          right: '0',
          bottom: '0',
          padding: '8px',
          fontSize: 'var(--text-fussnote)',
          fontWeight: 'bold',
          color: 'var(--color-white)',
        }}
      >
        {getCredits({ filename: foto_originalFilename }).label}
      </Link>
    </div>
  )
}

export default PhotoCreditsBox

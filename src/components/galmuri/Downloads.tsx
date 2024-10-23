import { fonts } from '@/lib/utils'

export function Downloads() {
  return (
    <div>
      {fonts.map((font) => {
        return (
          <a
            key={font}
            href={`https://cdn.jsdelivr.net/npm/galmuri/dist/${font.replaceAll(' ', '-')}.ttf`}
            download
          >
            Galmuri{font}
          </a>
        )
      })}
    </div>
  )
}

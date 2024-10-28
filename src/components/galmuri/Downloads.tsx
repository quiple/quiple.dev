import { fonts } from '@/components/galmuri/data'

export function Downloads() {
  return (
    <div className="download">
      {fonts.map((font) => {
        return (
          <a
            key={font.slug}
            href={`https://cdn.jsdelivr.net/npm/galmuri/dist/${font.name.replaceAll(' ', '-')}.ttf`}
            download
          >
            {font.name}
          </a>
        )
      })}
    </div>
  )
}

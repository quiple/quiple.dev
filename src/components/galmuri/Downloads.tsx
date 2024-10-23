import { fonts } from '@/components/galmuri/data'

export function Downloads() {
  return (
    <div>
      {fonts.map((font) => {
        return (
          <a
            key={font.slug}
            href={`https://cdn.jsdelivr.net/npm/galmuri/dist/Galmuri${font.name.replaceAll(' ', '-')}.ttf`}
            download
          >
            {font.name}
          </a>
        )
      })}
    </div>
  )
}

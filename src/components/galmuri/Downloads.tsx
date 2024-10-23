import { fonts } from './data'

export function Downloads() {
  return (
    <div>
      {fonts.map((font) => {
        return (
          <a
            key={`g${font.replaceAll(' ', '-')}`}
            href={`https://cdn.jsdelivr.net/npm/galmuri/dist/Galmuri${font.replaceAll(' ', '-')}.ttf`}
            download
          >
            {`Galmuri${font}`}
          </a>
        )
      })}
    </div>
  )
}

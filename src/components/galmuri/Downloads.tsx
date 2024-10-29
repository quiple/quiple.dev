import { fonts } from '@/components/galmuri/data'
import { buttonVariants } from '@/components/ui/button'

const families = Array.from(new Set(fonts.map((font) => font.family)))

export function Downloads() {
  return (
    <div className="download">
      {fonts.map((font) => {
        return (
          <a
            className={`${buttonVariants({ variant: 'outline' })} button outline-button`}
            key={font.slug}
            href={`https://cdn.jsdelivr.net/npm/galmuri/dist/${font.name.replaceAll(' ', '-')}.ttf`}
            download
            data-umami-event="Galmuri 다운로드"
            data-umami-event-font={font.name}
            data-umami-event-format="TTF"
          >
            {font.name}.ttf
          </a>
        )
      })}
    </div>
  )
}

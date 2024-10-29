import { fonts } from '@/components/galmuri/data'
import { buttonVariants } from '@/components/ui/button'

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
          >
            {font.name}
          </a>
        )
      })}
    </div>
  )
}

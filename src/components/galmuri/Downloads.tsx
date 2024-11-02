import { fonts, formats } from '@/components/galmuri/data'
import { buttonVariants } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardFooter, CardTitle } from '@/components/ui/card'

interface family {
  name: string
  size: number
}

const families = fonts
  .map((font) => {
    return { name: font.family, size: font.size }
  })
  .reduce((prev: family[], now) => {
    if (!prev.some((obj: family) => obj.name === now.name && obj.size === now.size)) {
      prev.push(now)
    }
    return prev
  }, [])

export function Downloads() {
  return (
    <div className="download">
      {families.map((family) => {
        return (
          <Card key={family.name} className="card">
            <CardHeader>
              <CardTitle>{family.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="buttons">
                {fonts
                  .filter((font) => font.family === family.name)
                  .map((font) => {
                    return formats.map((format) => {
                      return (
                        <a
                          key={font.slug}
                          className={`${buttonVariants({ variant: 'outline' })} button outline-button`}
                          href={`https://cdn.jsdelivr.net/npm/galmuri/dist/${font.name.replaceAll(' ', '-')}.${format}`}
                          download
                          data-umami-event="Galmuri 다운로드"
                          data-umami-event-font={font.name}
                          data-umami-event-format={format}
                        >
                          {font.style &&
                            `${font.style.charAt(0).toUpperCase()}${font.style.slice(1)}`}{' '}
                          {format.toUpperCase()}
                        </a>
                      )
                    })
                  })}
              </div>
            </CardContent>
            <CardFooter>{`${family.size}px`}</CardFooter>
          </Card>
        )
      })}
    </div>
  )
}

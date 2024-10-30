import { fonts, formats } from '@/components/galmuri/data'
import { buttonVariants } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const families = Array.from(new Set(fonts.map((font) => font.family)))

export function Downloads() {
  return (
    <div className="download">
      {families.map((familyName) => {
        return (
          <Card key={familyName} className="card">
            <CardHeader>
              <CardTitle>{familyName}</CardTitle>
            </CardHeader>
            <CardContent>
              {fonts
                .filter((font) => font.family === familyName)
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
                        {font.style} {format}
                      </a>
                    )
                  })
                })}
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

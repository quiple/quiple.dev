import {fonts, formats} from '@/components/galmuri/data'
import {buttonVariants} from '@/components/ui/button'
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from '@/components/ui/card'
import galmuri from '@/lib/galmuri'

const families = Array.from(
  fonts.reduce((map, font) => {
    const key = `${font.family}-${font.size}`
    if (!map.has(key)) {
      map.set(key, {name: font.family, size: font.size})
    }
    return map
  }, new Map()),
  ([, value]) => value,
)

export function Downloads() {
  return (
    <div className="download">
      {families.map((family) => {
        return (
          <Card key={family.name} className="card flex flex-col">
            <CardHeader className="pg-1">
              <CardTitle className="card-title">{family.name}</CardTitle>
            </CardHeader>
            <CardContent className="pg-1 !pt-0 grow">
              <div className="buttons">
                {fonts
                  .filter((font) => font.family === family.name)
                  .map((font) => {
                    return formats.map((format) => {
                      return (
                        <a
                          key={font.slug}
                          className={`${buttonVariants({variant: 'outline'})} button outline-button`}
                          href={
                            (
                              galmuri[font.slug as keyof typeof galmuri] as Record<string, string>
                            )?.[format]
                          }
                          download
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
            <CardFooter className="pg-1 !pt-0">{`${family.size}px`}</CardFooter>
          </Card>
        )
      })}
      <Card className="card flex flex-col">
        <CardContent className="pg-1 !pt-[1em] !pb-0 grow">
          <div className="buttons">
            <a
              className={`${buttonVariants({variant: 'outline'})} button outline-button`}
              href="https://github.com/quiple/galmuri/releases/latest"
              target="_blank"
              rel="nofollow noreferrer noopener"
            >
              GitHub 릴리스에서 다운로드
            </a>
          </div>
        </CardContent>
        <CardFooter className="pg-1">
          비트맵 스트라이크를 포함한 TrueType 폰트 및 TrueType 컬렉션 포함
        </CardFooter>
      </Card>
    </div>
  )
}

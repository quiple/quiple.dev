import {getImage} from 'astro:assets'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import {Skeleton} from '@/components/ui/skeleton'
import galmuri from '@/contents/galmuri/index.json'
import {WheelGesturesPlugin} from 'embla-carousel-wheel-gestures'
import {useEffect, useState} from 'react'

const linkPrefix = {
  steam: 'https://store.steampowered.com/app/',
  appstore: 'https://apps.apple.com/app/',
  patch: 'https://',
}

export function Showcase() {
  const [screenshots, setScreenshots] = useState<
    Record<string, {src: string; srcSet: {attribute: string}}>
  >({})

  useEffect(() => {
    const fetchData = async () => {
      const screenshots: Record<string, {src: string; srcSet: {attribute: string}}> = {}
      await Promise.all(
        galmuri.showcase.map(async (game) => {
          const screenshot = await import(`../../assets/${game.screenshot}`)
          screenshots[game.title.slug] = await getImage({
            src: screenshot.default,
            format: 'avif',
            height: 640,
          })
        })
      )
      setScreenshots(screenshots)
    }
    fetchData()
  }, [])

  return (
    <Carousel
      className="mt-[.5em]"
      opts={{align: 'start', loop: true}}
      plugins={[WheelGesturesPlugin()]}
    >
      <CarouselContent className="-ml-[1em]">
        {galmuri.showcase.map((game) => {
          const screenshot = screenshots[game.title.slug]
          // const aspectRatio = screenshot.attributes.width / screenshot.attributes.height

          return (
            <CarouselItem key={game.title.slug} className="basis-auto pl-[1em]">
              <figure>
                {!screenshot ? (
                  <Skeleton className="rounded-none h-40 sm:h-52 md:h-60 lg:h-72 xl:h-80" />
                ) : (
                  <>
                    <Skeleton
                      // style={{aspectRatio: aspectRatio}}
                      className="absolute -z-10 rounded-none h-40 sm:h-52 md:h-60 lg:h-72 xl:h-80"
                    />
                    <img
                      // style={{aspectRatio: aspectRatio}}
                      src={screenshot.src}
                      srcSet={screenshot.srcSet.attribute}
                      alt={game.title.name}
                    />
                    <span className="overlay" />
                    <figcaption>
                      <a
                        href={linkPrefix[game.type as keyof typeof linkPrefix] + game.link}
                        target="_blank"
                        rel="nofollow noreferrer noopener"
                      >
                        {game.title.name}
                      </a>{' '}
                      {game.type === 'patch' ? 'by' : '©'} {game.author}
                      {game.type === 'patch' && ' (사용자 패치)'}
                    </figcaption>
                  </>
                )}
              </figure>
            </CarouselItem>
          )
        })}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}

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
import type {GetImageResult} from 'astro'
import {WheelGesturesPlugin} from 'embla-carousel-wheel-gestures'
import {useEffect, useState} from 'react'

const linkPrefix = {
  steam: 'https://store.steampowered.com/app/',
  appstore: 'https://apps.apple.com/app/',
  patch: 'https://',
}

const showcase = galmuri.showcase
showcase.reverse()

export function Showcase() {
  const [screenshots, setScreenshots] = useState<Record<string, GetImageResult>>({})

  useEffect(() => {
    const fetchData = async () => {
      const screenshots: Record<string, GetImageResult> = {}
      const images = import.meta.glob<{default: ImageMetadata}>('/src/assets/showcase/*/*')

      await Promise.all(
        galmuri.showcase.map(async (game) => {
          const imagePath = `/src/assets/${game.screenshot}`
          const imageModule = images[imagePath]
          if (imageModule) {
            const {default: screenshot} = await imageModule()
            screenshots[game.title.slug] = await getImage({
              src: screenshot,
              format: 'avif',
              height: 640,
            })
          }
        }),
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
        {showcase.map((game) => {
          const screenshot = screenshots[game.title.slug]

          return (
            <CarouselItem key={game.title.slug} className="basis-auto pl-[1em]">
              <figure>
                {!screenshot ? (
                  <Skeleton className="rounded-none h-40 sm:h-52 md:h-60 lg:h-72 xl:h-80" />
                ) : (
                  <>
                    <Skeleton
                      style={{
                        aspectRatio: screenshot.attributes.width / screenshot.attributes.height,
                      }}
                      className="absolute -z-10 rounded-none h-40 sm:h-52 md:h-60 lg:h-72 xl:h-80"
                    />
                    <img
                      style={{
                        aspectRatio: screenshot.attributes.width / screenshot.attributes.height,
                      }}
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

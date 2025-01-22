import {getImage} from 'astro:assets'
import sc200223 from '@/assets/showcase/200223.png'
import sc200622 from '@/assets/showcase/200622.png'
import sc201221 from '@/assets/showcase/201221.png'
import sc210105 from '@/assets/showcase/210105.png'
import sc210223 from '@/assets/showcase/210223.jpg'
import sc210302 from '@/assets/showcase/210302.jpg'
import sc220220 from '@/assets/showcase/220220.png'
import sc220507 from '@/assets/showcase/220507.png'
import sc220621 from '@/assets/showcase/220621.jpg'
import sc221006 from '@/assets/showcase/221006.webp'
import sc221127 from '@/assets/showcase/221127.png'
import sc230420 from '@/assets/showcase/230420.png'
import sc240111_2 from '@/assets/showcase/240111-2.png'
import sc240111 from '@/assets/showcase/240111.png'
import sc240118 from '@/assets/showcase/240118.jpg'
import sc240202 from '@/assets/showcase/240202.png'
import sc240218 from '@/assets/showcase/240218.png'
import sc240710 from '@/assets/showcase/240710.jpg'
import sc240905 from '@/assets/showcase/240905.jpg'
import sc240919 from '@/assets/showcase/240919.png'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import {Skeleton} from '@/components/ui/skeleton'
import type {GetImageResult} from 'astro'
import {WheelGesturesPlugin} from 'embla-carousel-wheel-gestures'
import {useEffect, useState} from 'react'

const format = 'avif'
const height = 640

interface game {
  title: string
  author: string
  link: string
  type: 'steam' | 'appstore' | 'patch'
  image: GetImageResult
}

const linkPrefix = {
  steam: 'https://store.steampowered.com/app/',
  appstore: 'https://apps.apple.com/app/',
  patch: 'https://',
}

export function Showcase() {
  const [loading, setLoading] = useState(true)
  const [games, setGames] = useState<game[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const games: game[] = [
        {
          title: 'Keylocker',
          author: 'Moonana',
          link: '1325040',
          type: 'steam',
          image: await getImage({src: sc240919, format: format, height: height}),
        },
        {
          title: '소년기의 끝',
          author: 'buriki clock',
          link: '2403290',
          type: 'steam',
          image: await getImage({src: sc240905, format: format, height: height}),
        },
        {
          title: 'Time Treker',
          author: 'Fuse Game',
          link: '2776500',
          type: 'steam',
          image: await getImage({src: sc240710, format: format, height: height}),
        },
        {
          title: 'ZeroRanger',
          author: 'Robeureu',
          link: 'blog.naver.com/robeureu/223357336308',
          type: 'patch',
          image: await getImage({src: sc240218, format: format, height: height}),
        },
        {
          title: 'STONKS-9800',
          author: 'TERNOX',
          link: '1539140',
          type: 'steam',
          image: await getImage({src: sc240202, format: format, height: height}),
        },
        {
          title: '미제사건은 끝내야 하니까',
          author: 'Somi',
          link: '2676840',
          type: 'steam',
          image: await getImage({src: sc240118, format: format, height: height}),
        },
        {
          title: 'VVVVVV',
          author: 'Terry Cavanagh',
          link: '70300',
          type: 'steam',
          image: await getImage({src: sc240111_2, format: format, height: height}),
        },
        {
          title: 'Momodora: Moonlit Farewell',
          author: 'Bombservice',
          link: '1747760',
          type: 'steam',
          image: await getImage({src: sc240111, format: format, height: height}),
        },
        {
          title: 'Coffee Talk Episode 2: Hibiscus & Butterfly',
          author: 'Toge Productions',
          link: '1663220',
          type: 'steam',
          image: await getImage({src: sc230420, format: format, height: height}),
        },
        {
          title: 'Papers, Please',
          author: 'Lucas Pope',
          link: '239030',
          type: 'steam',
          image: await getImage({src: sc221127, format: format, height: height}),
        },
        {
          title: 'Dungeon Squad',
          author: 'GameCoaster',
          link: '1642733080',
          type: 'appstore',
          image: await getImage({src: sc221006, format: format, height: height}),
        },
        {
          title: 'Shotgun King: The Final Checkmate',
          author: 'PUNKCAKE Delicieux',
          link: '1972440',
          type: 'steam',
          image: await getImage({src: sc220621, format: format, height: height}),
        },
        {
          title: 'Monster Sanctuary',
          author: '솔라리어스',
          link: 'blog.naver.com/ansewo/222702695752',
          type: 'patch',
          image: await getImage({src: sc220507, format: format, height: height}),
        },
        {
          title: 'NEEDY GIRL OVERDOSE',
          author: '코스믹딜루즈 & quiple',
          link: 'cosmicdeluge.tistory.com/5',
          type: 'patch',
          image: await getImage({src: sc220220, format: format, height: height}),
        },
        {
          title: 'Teamfight Manager',
          author: 'Team Samoyed',
          link: '1372810',
          type: 'steam',
          image: await getImage({src: sc210302, format: format, height: height}),
        },
        {
          title: 'BLUE REVOLVER',
          author: 'Sepheille',
          link: 'steamcommunity.com/sharedfiles/filedetails/?id=2405396574',
          type: 'patch',
          image: await getImage({src: sc210223, format: format, height: height}),
        },
        {
          title: 'Duke Dashington Remastered',
          author: '바람 번역단',
          link: 'blog.naver.com/bleach1491/222196942354',
          type: 'patch',
          image: await getImage({src: sc210105, format: format, height: height}),
        },
        {
          title: 'Rev',
          author: '바람 번역단',
          link: 'blog.naver.com/bleach1491/222180900832',
          type: 'patch',
          image: await getImage({src: sc201221, format: format, height: height}),
        },
        {
          title: 'Alwa’s Legacy',
          author: '바람 번역단',
          link: 'blog.naver.com/bleach1491/222008221688',
          type: 'patch',
          image: await getImage({src: sc200622, format: format, height: height}),
        },
        {
          title: 'Westerado: Double Barreled',
          author: '바람 번역단',
          link: 'blog.naver.com/bleach1491/221820971383',
          type: 'patch',
          image: await getImage({src: sc200223, format: format, height: height}),
        },
      ]
      setGames(games)
      setLoading(false)
    }

    fetchData()
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <Carousel
      className="mt-[.5em]"
      opts={{align: 'start', loop: true}}
      plugins={[WheelGesturesPlugin()]}
    >
      <CarouselContent className="-ml-[1em]">
        {games.map((game) => {
          const aspectRatio = game.image.attributes.width / game.image.attributes.height

          return (
            <CarouselItem key={game.title} className="basis-auto pl-[1em]">
              <figure>
                <Skeleton
                  style={{aspectRatio: aspectRatio}}
                  className="absolute -z-10 rounded-none h-40 sm:h-52 md:h-60 lg:h-72 xl:h-80"
                />
                <img
                  style={{aspectRatio: aspectRatio}}
                  src={game.image.src}
                  srcSet={game.image.srcSet.attribute}
                  alt={game.title}
                />
                <span className="overlay" />
                <figcaption>
                  <a
                    href={linkPrefix[game.type] + game.link}
                    target="_blank"
                    rel="nofollow noreferrer noopener"
                  >
                    {game.title}
                  </a>{' '}
                  {game.type === 'patch' ? 'by' : '©'} {game.author}
                  {game.type === 'patch' && ' (사용자 패치)'}
                </figcaption>
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

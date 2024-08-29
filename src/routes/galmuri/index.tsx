import {
  $,
  type CSSProperties,
  component$,
  useOnWindow,
  useSignal,
  useStyles$,
  useVisibleTask$,
} from '@builder.io/qwik'
import type { DocumentHead } from '@builder.io/qwik-city'

import { Splide } from '@splidejs/splide'
import splideCore from '@splidejs/splide/css/core?inline'
import autosize from 'autosize'
import { toHtml } from 'hast-util-to-html'
import QRCodeStyling, { type Options as qrOptions } from 'qr-code-styling'
import { BlurhashCanvas } from 'qwik-blurhash'
import { refractor } from 'refractor'

import { fonts, pangramEn, pangramKo, showcase } from './data'
import { info } from './info'
import ExternalLink from '~/components/ExternalLink'

let cssExamples: string = ''

fonts.forEach((font, i, array) => {
  cssExamples += `/* ${font.name}을(를) 사용하려면 */\nfont-family: "${font.family}", sans-serif;\n`
  if (font.style === 'Bold') cssExamples += 'font-weight: bold;\n'
  if (font.style === 'Condensed') cssExamples += 'font-stretch: condensed;\n'
  if (array[i + 1]) cssExamples += '\n'
})

const switchFont = (value: string) => {
  switch (value) {
    case 'Galmuri14':
      return {
        fontFamily: 'Galmuri14, sans-serif',
        fontWeight: 400,
        fontStretch: 'normal',
        padding: '0.25em 0.5em calc(0.25em + 1em / 15) calc(0.5em + 1em / 15)',
      } as CSSProperties
    default:
      return {
        fontFamily: 'Galmuri11, sans-serif',
        fontWeight: 400,
        fontStretch: 'normal',
        padding: '0.25em 0.5em calc(0.25em + 1em / 12) calc(0.5em + 1em / 12)',
      } as CSSProperties
    case 'Galmuri11-Bold':
      return {
        fontFamily: 'Galmuri11, sans-serif',
        fontWeight: 700,
        fontStretch: 'normal',
        padding: '0.25em 0.5em calc(0.25em + 1em / 12) calc(0.5em + 1em / 12)',
      } as CSSProperties
    case 'Galmuri11-Condensed':
      return {
        fontFamily: 'Galmuri11, sans-serif',
        fontWeight: 400,
        fontStretch: 'condensed',
        padding: '0.25em 0.5em calc(0.25em + 1em / 12) calc(0.5em + 1em / 12)',
      } as CSSProperties
    case 'Galmuri9':
      return {
        fontFamily: 'Galmuri9, sans-serif',
        fontWeight: 400,
        fontStretch: 'normal',
        padding: '0.25em 0.5em calc(0.25em + 1em / 10) calc(0.5em + 1em / 10)',
      } as CSSProperties
    case 'Galmuri7':
      return {
        fontFamily: 'Galmuri7, sans-serif',
        fontWeight: 400,
        fontStretch: 'normal',
        padding: '0.25em 0.5em calc(0.25em + 1em / 8) calc(0.5em + 1em / 8)',
      } as CSSProperties
    case 'GalmuriMono11':
      return {
        fontFamily: 'GalmuriMono11, monospace',
        fontWeight: 400,
        fontStretch: 'normal',
        padding: '0.25em 0.5em calc(0.25em + 1em / 12) calc(0.5em + 1em / 12)',
      } as CSSProperties
    case 'GalmuriMono9':
      return {
        fontFamily: 'GalmuriMono9, monospace',
        fontWeight: 400,
        fontStretch: 'normal',
        padding: '0.25em 0.5em calc(0.25em + 1em / 10) calc(0.5em + 1em / 10)',
      } as CSSProperties
    case 'GalmuriMono7':
      return {
        fontFamily: 'GalmuriMono7, monospace',
        fontWeight: 400,
        fontStretch: 'normal',
        padding: '0.25em 0.5em calc(0.25em + 1em / 8) calc(0.5em + 1em / 8)',
      } as CSSProperties
  }
}

export default component$(() => {
  useStyles$(splideCore)
  const title = useSignal<HTMLDivElement>()
  const test = useSignal<HTMLTextAreaElement>()
  const testFont = useSignal<string>('Galmuri11')
  const testFontSize = useSignal<CSSProperties>({ fontSize: '36px' })
  const toss = useSignal<HTMLDivElement>()
  const kakao = useSignal<HTMLDivElement>()

  const shuffle = $(
    () =>
      (test.value!.value = `${pangramEn[Math.floor(Math.random() * pangramEn.length)]}\n${pangramKo[Math.floor(Math.random() * pangramKo.length)]}`),
  )

  useOnWindow(
    'load',
    $(() => {
      title.value!.style.opacity = (
        1 -
        window.scrollY / window.innerHeight
      ).toString()
      title.value!.style.filter = `blur(${window.scrollY / window.innerHeight}em)`
      setTimeout(() => {
        title.value!.classList.add('show')
      }, 500)
      shuffle()
      new Splide('.splide', {
        autoplay: true,
        gap: '1em',
        height: '20vw',
        arrows: false,
        pagination: false,
        type: 'loop',
        padding: '10vw',
        drag: 'free',
        autoWidth: true,
        snap: true,
        breakpoints: {
          1280: { height: '30vw' },
          960: { height: '40vw' },
          640: { height: '50vw' },
        },
      }).mount()
    }),
  )

  useOnWindow(
    'scroll',
    $(() => {
      if (window.scrollY / window.innerHeight <= 1) {
        title.value!.style.opacity = (
          1 -
          window.scrollY / window.innerHeight
        ).toString()
        title.value!.style.filter = `blur(${window.scrollY / window.innerHeight}em)`
      }
    }),
  )

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(() => {
    const qrOptions: Partial<qrOptions> = {
      margin: 0,
      width: 240,
      height: 240,
      type: 'svg',
      dotsOptions: {
        color: '#fafafa',
        type: 'square',
      },
      backgroundOptions: {
        color: 'transparent',
      },
      imageOptions: {
        crossOrigin: 'anonymous',
        margin: 0,
      },
    }

    const qrToss = new QRCodeStyling({
      image: '/images/toss.svg',
      data: 'supertoss://send?amount=0&bank=%ED%86%A0%EC%8A%A4%EB%B1%85%ED%81%AC&accountNo=100036350780&origin=qr',
      ...qrOptions,
    })
    qrToss.append(toss.value)

    const qrKakao = new QRCodeStyling({
      image: '/images/kakao.svg',
      data: 'https://qr.kakaopay.com/281006011000033397832181',
      ...qrOptions,
    })
    qrKakao.append(kakao.value)
  })

  return (
    <>
      <div id="title" ref={title}>
        <h1>Galmuri</h1>
        <div class="sub">
          <span>작은 크기에서도</span>
          <span>가독성 좋고 균형 있는</span>
          <span>한글 비트맵 폰트</span>
        </div>
        <div class="btns">
          <a href="#download" class="btn">
            다운로드
          </a>
          <ExternalLink
            text="GitHub에서 보기"
            href={`https://github.com/${info.githubUsername}/${info.githubReponame}`}
            class="btn line"
          />
        </div>
        <small>아래로 스크롤하여 더 많은 내용 확인하기</small>
      </div>

      <p>
        Galmuri는 닌텐도 DS 본체와 소프트웨어에 사용되었던 폰트 디자인에서
        영감을 받은 비트맵 폰트입니다. 2019년 10월 9일 한글날에 처음
        공개되었으며, Galmuri의 이름은 2008년 6월 사용자 한글화 커뮤니티{' '}
        <ExternalLink text="한식구" href="https://cafe.naver.com/hansicgu" />
        에서 김동한 님께서 만들어 배포하신 비트맵 폰트{' '}
        <ExternalLink
          text="갈무리M"
          href="https://cafe.naver.com/hansicgu/174"
        />
        에서 유래하였습니다.
      </p>

      <div class="btns">
        <ExternalLink
          text="비트맵 폰트 이미지 생성기"
          href="/generator"
          class="btn"
        />
      </div>

      <div id="test-control">
        <select
          id="test-family"
          aria-label="폰트 선택"
          onChange$={(event, target) => {
            testFont.value = target.value
          }}>
          {fonts.map((font) => (
            <option
              key={`option_${font.name.replaceAll(' ', '-')}`}
              value={font.name.replaceAll(' ', '-')}
              selected={font.name === 'Galmuri11' ? true : false}>
              {font.name}
            </option>
          ))}
        </select>
        <div>
          <input
            type="range"
            id="test-size"
            min="8"
            max="160"
            value="48"
            onInput$={(event, target) => {
              testFontSize.value = { fontSize: `${target.value}px` }
            }}
          />
          <label for="test-size" id="test-size-indicator">
            {testFontSize.value.fontSize}
          </label>
        </div>
        <button
          type="button"
          class="btn line"
          onClick$={() => {
            shuffle()
            autosize(test.value!)
          }}>
          예문 섞기
        </button>
      </div>

      <textarea
        id="test"
        ref={test}
        aria-label="테스트 입력"
        spellcheck={false}
        style={{
          ...switchFont(testFont.value),
          ...testFontSize.value,
        }}
        onInput$={() => autosize(test.value!)}
        rows={3}></textarea>

      <h2 id="license">라이선스</h2>
      <p>
        &copy; {info.copyrightDate} {info.author} (
        <a href={`mailto:${info.email}`}>{info.email}</a>)
      </p>
      <p>
        Galmuri는{' '}
        <ExternalLink
          text="SIL 오픈 폰트 라이선스 1.1"
          href="https://openfontlicense.org"
        />
        에 따라 사용할 수 있으며, 폰트가 자체적으로 판매되지 않는 한 자유롭게
        사용·연구·수정·재배포할 수 있습니다.
      </p>
      <p>
        OFL 1.1을 한국어로 번역한 내용은{' '}
        <ExternalLink
          text="이곳"
          href="https://github.com/quiple/galmuri/blob/main/ofl-ko.md"
        />
        에서 확인할 수 있으며, 라이선스 원문은{' '}
        <ExternalLink
          text="이곳"
          href="https://github.com/quiple/galmuri/blob/main/ofl.md"
        />
        에서 확인할 수 있습니다.
      </p>

      <h2 id="download">다운로드</h2>
      <section class="download">
        {fonts.map((font) => (
          <div class="item" key={`download_${font.name.replaceAll(' ', '-')}`}>
            <h3>{font.name}</h3>
            <div class="btns">
              <a
                data-umami-event="Galmuri 다운로드"
                data-umami-event-font={font.name}
                data-umami-event-format="TTF"
                download
                class="btn"
                href={`https://cdn.jsdelivr.net/npm/galmuri/dist/${font.name.replaceAll(' ', '-')}.ttf`}>
                TTF
              </a>
              <a
                data-umami-event="Galmuri 다운로드"
                data-umami-event-font={font.name}
                data-umami-event-format="WOFF2"
                download
                class="btn"
                href={`https://cdn.jsdelivr.net/npm/galmuri/dist/${font.name.replaceAll(' ', '-')}.woff2`}>
                WOFF2
              </a>
              <a
                data-umami-event="Galmuri 다운로드"
                data-umami-event-font={font.name}
                data-umami-event-format="BDF"
                download
                class="btn"
                href={`https://cdn.jsdelivr.net/npm/galmuri/dist/${font.name.replaceAll(' ', '-')}.bdf`}>
                BDF
              </a>
              <ExternalLink
                text="전체 글리프 목록 보기"
                href={`https://lsfont.quiple.dev#https://cdn.jsdelivr.net/npm/galmuri/dist/${font.name.replaceAll(' ', '-')}.ttf`}
                class="btn line"
              />
            </div>
          </div>
        ))}
      </section>
      <div class="btns">
        <ExternalLink
          text="GitHub 릴리스 페이지에서 다운로드하기"
          href={`https://github.com/${info.githubUsername}/${info.githubReponame}/releases/latest`}
          class="btn line"
        />
      </div>
      <p>
        Galmuri14는 15px (11pt), Galmuri11은 12px (9pt), Galmuri9는 10px
        (7.5pt), Galmuri7은 8px (6pt) 크기와 그 배수에서 가장 명확하게
        표시됩니다.
      </p>

      <h2 id="webfont">웹폰트로 사용</h2>
      <div class="flex flex-col gap-x-[1em] lg:flex-row">
        <div class="flex-1">
          <h3>CDN</h3>
          <pre
            dangerouslySetInnerHTML={toHtml(
              refractor.highlight(
                '<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/galmuri/dist/galmuri.css">',
                'html',
              ) as any,
            )}
          />
          <pre
            dangerouslySetInnerHTML={toHtml(
              refractor.highlight(
                '@import url("https://cdn.jsdelivr.net/npm/galmuri/dist/galmuri.css");',
                'css',
              ) as any,
            )}
          />
          <h3>npm 패키지</h3>
          <pre
            dangerouslySetInnerHTML={toHtml(
              refractor.highlight('npm i galmuri', 'sh') as any,
            )}
          />
          <pre
            dangerouslySetInnerHTML={toHtml(
              refractor.highlight(
                "import 'galmuri/dist/galmuri.css';",
                'js',
              ) as any,
            )}
          />
        </div>
        <div class="flex-1">
          <h3>CSS 규칙</h3>
          <pre
            dangerouslySetInnerHTML={toHtml(
              refractor.highlight(cssExamples, 'css') as any,
            )}
          />
        </div>
      </div>

      <h2 id="opentype-features">사용할 수 있는 OpenType 기능</h2>
      <h3>
        <span>kern</span> 커닝
      </h3>
      <div class="fea kern">
        <pre>Test TV/Audio Million LTE</pre>
        <pre>
          <span>Te</span>st T<span>V/A</span>udio M<span>illi</span>on{' '}
          <span>LT</span>E
        </pre>
      </div>
      <h3>
        <span>tnum</span> 고정폭 숫자
      </h3>
      <div class="fea tnum">
        <pre>
          1,879,425원
          <br />
          2,624,560원
          <br />
          1,751,853원
        </pre>
        <pre>
          <span>1,879,425</span>원<br />
          <span>2,624,560</span>원<br />
          <span>1,751,853</span>원
        </pre>
      </div>
      <pre
        dangerouslySetInnerHTML={toHtml(
          refractor.highlight(
            'font-variant-numeric: tabular-nums; /* 또는 */ font-feature-settings: "tnum" 1;',
            'css',
          ) as any,
        )}
      />
      <h3>
        <span>zero</span> 슬래시 0
      </h3>
      <div class="fea zero">
        <pre>0123456789</pre>
        <pre>
          <span>0</span>123456789
        </pre>
      </div>
      <pre
        dangerouslySetInnerHTML={toHtml(
          refractor.highlight(
            'font-variant-numeric: slashed-zero; /* 또는 */ font-feature-settings: "zero" 1;',
            'css',
          ) as any,
        )}
      />

      <h2 id="showcase">쇼케이스</h2>
      <section class="splide" aria-label="Galmuri 쇼케이스">
        <div class="splide__track">
          <div class="splide__list">
            {showcase.map((game) => (
              <div class="splide__slide" key={game.title}>
                <div class="slide-img-wrapper">
                  <BlurhashCanvas
                    hash={game.hash}
                    width={game.blurWidth * 100}
                    height={game.blurHeight * 100}
                    punch={1}
                  />
                  {game.file}
                </div>
                <p>
                  <ExternalLink
                    text={game.title}
                    href={`${
                      game.type === 'steam'
                        ? 'https://store.steampowered.com/app/'
                        : game.type === 'appstore'
                          ? 'https://apps.apple.com/app/'
                          : 'https://'
                    }${game.link}`}
                  />{' '}
                  {game.type === 'patch' ? '(사용자 패치) by' : '©'}{' '}
                  {game.author}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <h3>Galmuri를 포함하여 파생된 폰트</h3>
      <ul>
        <li>
          <ExternalLink
            text="Fusion Pixel Font"
            href="https://github.com/TakWolf/fusion-pixel-font"
          />{' '}
          by TakWolf
          <br />
          SIL 오픈 폰트 라이선스 1.1 • 포함 폰트:{' '}
          <ExternalLink
            text="Ark Pixel Font"
            href="https://github.com/TakWolf/ark-pixel-font"
          />
          ,{' '}
          <ExternalLink
            text="MisakiGothic"
            href="https://littlelimit.net/misaki.htm"
          />
          ,{' '}
          <ExternalLink
            text="BoutiqueBitmap9x9"
            href="https://github.com/scott0107000/BoutiqueBitmap9x9"
          />
          ,{' '}
          <ExternalLink
            text="BoutiqueBitmap7x7"
            href="https://github.com/scott0107000/BoutiqueBitmap7x7"
          />
          ,{' '}
          <ExternalLink
            text="Cubic 11"
            href="https://github.com/ACh-K/Cubic-11"
          />
          , Galmuri11, Galmuri9, Galmuri7
        </li>
        <li>
          <ExternalLink
            text="QuanPixel"
            href="https://diaowinner.itch.io/galmuri-extended"
          />{' '}
          by diaowinner
          <br />
          SIL 오픈 폰트 라이선스 1.1 • 포함 폰트: Galmuri7,{' '}
          <ExternalLink
            text="Chill-Bitmap"
            href="https://github.com/Warren2060/Chill-Bitmap"
          />
        </li>
      </ul>

      <h2 id="tools-used">사용한 도구</h2>
      <ul>
        <li>
          바이너리 문자 집합 추출:{' '}
          <ExternalLink
            text="CrystalTile2"
            href="https://www.romhacking.net/utilities/818"
          />{' '}
          by angel-team
        </li>
        <li>
          GNU Unifont .hex 형식 폰트 변환:{' '}
          <ExternalLink
            text="Unifont Utilities"
            href="http://unifoundry.com/unifont/unifont-utilities.html"
          />{' '}
          by Unifoundry.com
        </li>
        <li>
          비트맵 폰트 편집 및 TrueType 윤곽선 폰트 생성:{' '}
          <ExternalLink
            text="Bits'N'Picas"
            href="https://github.com/kreativekorp/bitsnpicas"
          />{' '}
          by Kreative Software
        </li>
        <li>
          폰트 재작성 및 OpenType 기능 추가:{' '}
          <ExternalLink
            text="Adobe Font Development Kit for OpenType"
            href="https://github.com/adobe-type-tools/afdko"
          />{' '}
          by Adobe
        </li>
        <li>
          WOFF2 압축 및 TrueType 콜렉션 생성:{' '}
          <ExternalLink
            text="fontTools"
            href="https://github.com/fonttools/fonttools"
          />{' '}
          by Just van Rossum
        </li>
      </ul>

      <h2 id="donate">후원하기</h2>
      <div id="donate-img">
        <ExternalLink
          text="토스로 후원하기"
          href="supertoss://send?amount=0&bank=%ED%86%A0%EC%8A%A4%EB%B1%85%ED%81%AC&accountNo=100036350780"
          content={<div ref={toss} />}
        />
        <ExternalLink
          text="카카오페이로 후원하기"
          href="https://qr.kakaopay.com/Ej8JN15fH"
          content={<div ref={kakao} />}
        />
      </div>
    </>
  )
})

export const head: DocumentHead = {
  title: 'Galmuri',
  meta: [
    {
      name: 'description',
      content: '작은 크기에서도 가독성 좋고 균형 있는 한글 비트맵 폰트.',
    },
    {
      property: 'og:title',
      content: 'Galmuri',
    },
    {
      property: 'og:description',
      content: '작은 크기에서도 가독성 좋고 균형 있는 한글 비트맵 폰트.',
    },
  ],
  styles: [
    {
      style: 'main { margin-top: 100vh !important; }',
    },
  ],
}

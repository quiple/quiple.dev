import { $, component$, useSignal, useStyles$ } from '@builder.io/qwik'
import type { DocumentHead } from '@builder.io/qwik-city'
import { worker$ } from '@builder.io/qwik-worker'

import {
  $Bitmap,
  $Font,
  type DirectionType,
  type Font,
  type Glyph,
  type GlyphMeta,
} from 'bdfparser'
import fetchline from 'fetchline'

import { fonts } from '../galmuri/data'
import style from '../style.scss?inline'
import { charsets } from './charset'
import pageStyle from './style.scss?inline'
import ExternalLink from '~/components/ExternalLink'
import Spinner from '~/media/spinner.svg?jsx'

type CanvasContext = { fillStyle: any; fillRect: any }

/*
const escapeRegExp = (s: string): string =>
  s.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&')

async function* fileToAsyncIterable(file: File): AsyncIterableIterator<string> {
  const reader = file.stream().getReader()
  const delimiter = /\r?\n/g

  let { value: chunk, done: readerDone } = await reader.read()
  const decoder = new TextDecoder('utf-8')
  let chunkStr = chunk ? decoder.decode(chunk) : ''

  let re: RegExp
  if (typeof delimiter === 'string') {
    if (delimiter === '') {
      throw new Error('delimiter cannot be empty string!')
    }
    re = new RegExp(escapeRegExp(delimiter), 'g')
  } else if (/g/.test(delimiter.flags) === false) {
    re = new RegExp(delimiter.source, delimiter.flags + 'g')
  } else {
    re = delimiter
  }

  let startIndex = 0

  while (true) {
    const result = re.exec(chunkStr)
    if (result === null) {
      if (readerDone === true) {
        break
      }
      const remainder = chunkStr.substring(startIndex)
      ;({ value: chunk, done: readerDone } = await reader.read())
      chunkStr = remainder + (chunkStr ? decoder.decode(chunk) : '')
      startIndex = 0
      continue
    }
    yield chunkStr.substring(startIndex, result.index)
    startIndex = re.lastIndex
  }

  yield chunkStr.substring(startIndex)
}
*/

export const drawFont = worker$(
  async (
    type: 0 | 1,
    fontName: string,
    charset: string,
    options?: {
      linelimit?: number | null
      mode?: -1 | 0 | 1 | null
      direction?: DirectionType | null
      usecurrentglyphspacing?: boolean | null
      missing?: Glyph | GlyphMeta | null
      bb?: [number, number, number, number] | null
    },
  ) => {
    let font: Font

    if (type === 0) {
      font = await $Font(
        fetchline(
          `https://cdn.jsdelivr.net/npm/galmuri/dist/${fontName.replaceAll(' ', '-')}.bdf`,
        ),
      )
    } else {
      font = await $Font(fetchline(fontName))
    }

    return font.draw(charset, options)
  },
)

export default component$(() => {
  useStyles$(style)
  useStyles$(pageStyle)
  const fontCurrent = useSignal<string>()
  const charsetCurrent = useSignal<string>()
  const canvas = useSignal<HTMLCanvasElement>()
  const drawButtonDisabled = useSignal<boolean>(false)
  const copyButton = useSignal<HTMLAnchorElement>()
  const downloadButton = useSignal<HTMLAnchorElement>()

  const drawFontImage = $(
    async (event: SubmitEvent, target: HTMLFormElement) => {
      const formData = new FormData(target),
        font = formData.get('font') as string,
        charset = formData.get('charset') as string,
        xOffset = Number(formData.get('x-offset')),
        yOffset = Number(formData.get('y-offset')),
        tileWidth = Number(formData.get('tile-width')),
        tileHeight = Number(formData.get('tile-height')),
        tileColumn = Number(formData.get('tile-column')),
        foreground = formData.get('foreground') as string,
        background = formData.get('background') as string,
        shadowColor = formData.get('shadow-color') as string,
        shadowPosition = [
          formData.get('shadow-topleft') as string,
          formData.get('shadow-top') as string,
          formData.get('shadow-topright') as string,
          formData.get('shadow-left') as string,
          formData.get('shadow-right') as string,
          formData.get('shadow-bottomleft') as string,
          formData.get('shadow-bottom') as string,
          formData.get('shadow-bottomright') as string,
        ]

      let customFont: File = new File([], '')
      if (fontCurrent.value === 'custom') {
        customFont = formData.get('custom-font') as File

        if (!customFont.size) {
          alert('사용자 지정 폰트를 업로드하세요.')
          return false
        }
      }

      let customCharset = ''
      if (charsetCurrent.value === 'custom') {
        customCharset = formData.get('custom-charset') as string

        if (!customCharset) {
          alert('사용자 지정 문자 집합을 입력하세요.')
          return false
        }
      }

      if (!tileWidth || !tileHeight) {
        alert('타일 크기를 입력하세요.')
        return false
      } else if (tileWidth <= 0 || tileHeight <= 0) {
        alert('타일 크기에 양숫값을 입력하세요.')
        return false
      }

      if (!tileColumn) {
        alert('열 수를 입력하세요.')
        return false
      } else if (tileColumn <= 0) {
        alert('열 수에 양숫값을 입력하세요.')
        return false
      }

      if (!foreground) {
        alert('전경색을 입력하세요.')
        return false
      }

      drawButtonDisabled.value = true
      canvas.value!.classList.add('hidden')
      copyButton.value!.classList.add('disabled')
      downloadButton.value!.classList.add('disabled')

      let fontSize: number
      switch (font) {
        default:
          fontSize = 11
          break
        case 'Galmuri14':
          fontSize = 14
          break
        case 'Galmuri9':
          fontSize = 9
          break
        case 'Galmuri7':
          fontSize = 7
          break
        case 'GalmuriMono9':
          fontSize = 9
          break
        case 'GalmuriMono7':
          fontSize = 7
          break
      }

      const position: number[][] = []
      shadowPosition.forEach((e) => {
        if (e) position.push(e.split(' ').map((f) => Number(f)))
      })

      let xOff, yOff
      xOff = xOffset
      yOff = yOffset
      const includesArray = (data: any[], arr: any[]) => {
        return data.some(
          (e) => Array.isArray(e) && e.every((o, i) => Object.is(arr[i], o)),
        )
      }
      if (
        includesArray(position, [-1, -1]) ||
        includesArray(position, [-1, 0]) ||
        includesArray(position, [-1, 1])
      ) {
        xOff++
      }
      if (
        includesArray(position, [-1, 1]) ||
        includesArray(position, [0, 1]) ||
        includesArray(position, [1, 1])
      ) {
        yOff++
      }

      let __charset = ''
      if (charsetCurrent.value === 'custom') {
        __charset = customCharset
      } else {
        __charset = charsets[charset]
      }

      const cvs = canvas.value!
      cvs.width = tileWidth * tileColumn
      cvs.height = tileHeight * Math.ceil(__charset.length / tileColumn)
      const ctx = cvs.getContext('2d')
      ctx!.reset()
      if (background !== '') {
        ctx!.fillStyle = `#${background}`
        ctx!.fillRect(
          0,
          0,
          tileWidth * tileColumn,
          tileHeight * Math.floor(__charset.length / tileColumn),
        )
        ctx!.fillRect(
          0,
          tileHeight * Math.floor(__charset.length / tileColumn),
          tileWidth * (__charset.length % tileColumn),
          tileHeight * Math.ceil(__charset.length / tileColumn),
        )
      }

      let __type: 0 | 1
      let __font: string
      const jsdelivr = 'https://cdn.jsdelivr.net/gh'
      switch (font) {
        case 'k6x8-gothic':
          __type = 1
          __font = jsdelivr + '/quiple/kadoma-fonts/k6x8/k6x8_gothic.bdf'
          break
        case 'k6x8-mincho':
          __type = 1
          __font = jsdelivr + '/quiple/kadoma-fonts/k6x8/k6x8_mincho.bdf'
          break
        case 'misaki-gothic':
          __type = 1
          __font = jsdelivr + '/quiple/kadoma-fonts/misaki/misaki_gothic.bdf'
          break
        case 'misaki-gothic-2nd':
          __type = 1
          __font =
            jsdelivr + '/quiple/kadoma-fonts/misaki/misaki_gothic_2nd.bdf'
          break
        case 'misaki-mincho':
          __type = 1
          __font = jsdelivr + '/quiple/kadoma-fonts/misaki/misaki_mincho.bdf'
          break
        case 'k8x12':
          __type = 1
          __font = jsdelivr + '/quiple/kadoma-fonts/k8x12/k8x12.bdf'
          break
        case 'k8x12l':
          __type = 1
          __font = jsdelivr + '/quiple/kadoma-fonts/k8x12/k8x12L.bdf'
          break
        case 'k8x12s':
          __type = 1
          __font = jsdelivr + '/quiple/kadoma-fonts/k8x12/k8x12S.bdf'
          break
        case 'k12x8':
          __type = 1
          __font = jsdelivr + '/quiple/kadoma-fonts/k12x8/k12x8.bdf'
          break
        case 'zpix':
          __type = 1
          __font = jsdelivr + '/SolidZORO/zpix-pixel-font/dist/zpix.bdf'
          break
        default:
          __type = 0
          __font = font
          break
      }

      let bitmap = await drawFont(__type, __font, __charset, {
        mode: -1,
        bb: [tileWidth, tileHeight, -xOff, -(tileHeight - fontSize) + yOff],
        linelimit: tileWidth * tileColumn,
      })
      if (position.length > 0 && shadowColor) {
        position.forEach((e) => {
          const bitmapTemp = $Bitmap(bitmap.bindata)
          bitmapTemp.shadow(...e)
          bitmapTemp.draw2canvas(ctx as CanvasContext, {
            '0': null,
            '1': `#${foreground}`,
            '2': `#${shadowColor}`,
          })
        })
      } else {
        bitmap = $Bitmap(bitmap.bindata)
        bitmap.draw2canvas(ctx as CanvasContext, {
          '0': null,
          '1': `#${foreground}`,
          '2': `#${shadowColor}`,
        })
      }

      canvas.value!.classList.remove('hidden')
      copyButton.value!.classList.remove('disabled')
      downloadButton.value!.classList.remove('disabled')
      downloadButton.value!.href = canvas.value!.toDataURL()
      downloadButton.value!.download = `${font}_${tileWidth}x${tileHeight}`
      drawButtonDisabled.value = false
    },
  )

  const overrideColor = $((event: any, target: HTMLInputElement) => {
    target.value = target.value.replaceAll(/[^\dabcdefABCDEF]/g, '')
  })
  const overrideNumber = $((event: any, target: HTMLInputElement) => {
    target.value = target.value.replaceAll(/\D/g, '')
  })
  const overrideNumberMinus = $((event: any, target: HTMLInputElement) => {
    target.value = target.value.replaceAll(/[^\d-]/g, '')
  })

  return (
    <main class="container mx-auto flex flex-col-reverse lg:flex-row items-start gap-[20px] p-[20px]">
      <aside class="sticky top-[20px] flex lg:w-[24rem] flex-col gap-[20px]">
        <form
          class="flex flex-col gap-[10px]"
          preventdefault:submit
          onSubmit$={drawFontImage}>
          <div class="form">
            <div class="form-row">
              <label class="left" for="font">
                폰트
              </label>
              <div class="right">
                <select
                  id="font"
                  name="font"
                  onChange$={(event, target) => {
                    fontCurrent.value = target.value
                  }}>
                  <optgroup label="Galmuri">
                    {fonts.map((font) => (
                      <option
                        key={`option_${font.name.replaceAll(' ', '-')}`}
                        value={font.name.replaceAll(' ', '-')}
                        selected={font.name === 'Galmuri11' ? true : false}>
                        {font.name} ({font.size}px)
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="Num Kadoma">
                    <option value="k6x8-gothic">k6x8 Gothic (8px)</option>
                    <option value="k6x8-mincho">k6x8 Mincho (8px)</option>
                    <option value="misaki-gothic">Misaki Gothic (8px)</option>
                    <option value="misaki-gothic-2nd">
                      Misaki Gothic 2nd (8px)
                    </option>
                    <option value="misaki-mincho">Misaki Mincho (8px)</option>
                    <option value="k8x12">k8x12 (12px)</option>
                    <option value="k8x12l">k8x12L (12px)</option>
                    <option value="k8x12s">k8x12S (12px)</option>
                    <option value="k12x8">k12x8 (8px)</option>
                  </optgroup>
                  <optgroup>
                    <option value="zpix">Zpix (12px)</option>
                  </optgroup>
                  {/* <option value="custom">사용자 지정 폰트 업로드</option> */}
                </select>
              </div>
            </div>
            {fontCurrent.value === 'custom' && (
              <div class="form-row col">
                <label class="left" for="custom-font">
                  사용자 지정 폰트 (.bdf)
                </label>
                <div class="right">
                  <input
                    type="file"
                    id="custom-font"
                    name="custom-font"
                    accept=".bdf"
                  />
                </div>
              </div>
            )}
            <div class="form-row">
              <label class="left" for="charset">
                문자 집합
              </label>
              <div class="right">
                <select
                  name="charset"
                  id="charset"
                  onChange$={(event, target) => {
                    charsetCurrent.value = target.value
                  }}>
                  <optgroup label="한글 음절">
                    <option value="set2350" selected>
                      2350자
                    </option>
                    <option value="set2355">2355자</option>
                    <option value="set2780">2780자</option>
                    <option value="set4358">4358자</option>
                    <option value="set11172">11172자</option>
                  </optgroup>
                  <optgroup label="EUC-KR">
                    <option value="seteuckr">한자 제외</option>
                    <option value="seteuckr2355">한자 제외, 한글 2355자</option>
                    <option value="seteuckr2780">한자 제외, 한글 2780자</option>
                    <option value="seteuckr4358">한자 제외, 한글 4358자</option>
                    <option value="seteuckr11172">
                      한자 제외, 한글 11172자
                    </option>
                  </optgroup>
                  <optgroup label="일본 한자">
                    <option value="setKanji6355sjis">
                      Shift_JIS 순서 6355자
                    </option>
                    <option value="setKanji6355unicode">
                      Unicode 순서 6355자
                    </option>
                  </optgroup>
                  <optgroup>
                    <option value="custom">사용자 지정 문자 집합 입력</option>
                  </optgroup>
                </select>
              </div>
            </div>
            {charsetCurrent.value === 'custom' && (
              <div class="form-row col">
                <label class="left" for="custom-charset">
                  사용자 지정 문자 집합
                </label>
                <div class="right">
                  <textarea
                    id="custom-charset"
                    name="custom-charset"
                    class="w-full"
                  />
                </div>
              </div>
            )}
            <div class="form-row">
              <label class="left" for="x-offset">
                오프셋
              </label>
              <div class="right">
                <input
                  id="x-offset"
                  name="x-offset"
                  class="tabular-nums"
                  type="number"
                  value="0"
                  onKeyDown$={overrideNumberMinus}
                  onKeyPress$={overrideNumberMinus}
                  onKeyUp$={overrideNumberMinus}
                  onBlur$={overrideNumberMinus}
                />
                ,{' '}
                <input
                  id="y-offset"
                  name="y-offset"
                  class="tabular-nums"
                  type="number"
                  value="0"
                  onKeyDown$={overrideNumberMinus}
                  onKeyPress$={overrideNumberMinus}
                  onKeyUp$={overrideNumberMinus}
                  onBlur$={overrideNumberMinus}
                />
              </div>
            </div>
            <div class="form-row">
              <label class="left" for="tile-width">
                타일 크기
              </label>
              <div class="right">
                <input
                  id="tile-width"
                  name="tile-width"
                  class="tabular-nums"
                  type="number"
                  value="16"
                  min="1"
                  onKeyDown$={overrideNumber}
                  onKeyPress$={overrideNumber}
                  onKeyUp$={overrideNumber}
                  onBlur$={overrideNumber}
                />{' '}
                ×{' '}
                <input
                  id="tile-height"
                  name="tile-height"
                  class="tabular-nums"
                  type="number"
                  value="16"
                  min="1"
                  onKeyDown$={overrideNumber}
                  onKeyPress$={overrideNumber}
                  onKeyUp$={overrideNumber}
                  onBlur$={overrideNumber}
                />
              </div>
            </div>
            <div class="form-row">
              <label class="left" for="tile-column">
                열 수
              </label>
              <div class="right">
                <input
                  id="tile-column"
                  name="tile-column"
                  class="tabular-nums"
                  type="number"
                  value="64"
                  min="1"
                  onKeyDown$={overrideNumber}
                  onKeyPress$={overrideNumber}
                  onKeyUp$={overrideNumber}
                  onBlur$={overrideNumber}
                />
              </div>
            </div>
            <div class="form-row">
              <label class="left" for="foreground">
                전경색
              </label>
              <div class="right">
                #
                <input
                  id="foreground"
                  name="foreground"
                  class="tabular-nums"
                  type="text"
                  spellcheck={false}
                  value="63cf63"
                  onKeyDown$={overrideColor}
                  onKeyPress$={overrideColor}
                  onKeyUp$={overrideColor}
                  onBlur$={overrideColor}
                />
              </div>
            </div>
            <div class="form-row">
              <label class="left" for="background">
                <abbr title="비워 두면 투명을 사용합니다.">배경색</abbr>
              </label>
              <div class="right">
                #
                <input
                  id="background"
                  name="background"
                  class="tabular-nums"
                  type="text"
                  spellcheck={false}
                  value="000000"
                  onKeyDown$={overrideColor}
                  onKeyPress$={overrideColor}
                  onKeyUp$={overrideColor}
                  onBlur$={overrideColor}
                />
              </div>
            </div>
            <div class="form-row">
              <label class="left" for="shadow-color">
                그림자 색
              </label>
              <div class="right">
                #
                <input
                  id="shadow-color"
                  name="shadow-color"
                  class="tabular-nums"
                  type="text"
                  spellcheck={false}
                  value="3933ff"
                  onKeyDown$={overrideColor}
                  onKeyPress$={overrideColor}
                  onKeyUp$={overrideColor}
                  onBlur$={overrideColor}
                />
              </div>
            </div>
            <div class="form-row">
              <label class="left" for="shadow-bottomright">
                그림자 위치
              </label>
              <div class="right">
                <div class="grid grid-cols-3">
                  <input
                    type="checkbox"
                    name="shadow-topleft"
                    value="-1 1"
                    id="shadow-topleft"
                  />
                  <input
                    type="checkbox"
                    name="shadow-top"
                    value="0 1"
                    id="shadow-top"
                  />
                  <input
                    type="checkbox"
                    name="shadow-topright"
                    value="1 1"
                    id="shadow-topright"
                  />
                  <input
                    type="checkbox"
                    name="shadow-left"
                    value="-1 0"
                    id="shadow-left"
                  />
                  <input type="checkbox" disabled />
                  <input
                    type="checkbox"
                    name="shadow-right"
                    value="1 0"
                    id="shadow-right"
                  />
                  <input
                    type="checkbox"
                    name="shadow-bottomleft"
                    value="-1 -1"
                    id="shadow-bottomleft"
                  />
                  <input
                    type="checkbox"
                    name="shadow-bottom"
                    value="0 -1"
                    id="shadow-bottom"
                  />
                  <input
                    type="checkbox"
                    name="shadow-bottomright"
                    value="1 -1"
                    id="shadow-bottomright"
                  />
                </div>
              </div>
            </div>
          </div>
          <button
            disabled={drawButtonDisabled.value}
            type="submit"
            class="button big primary">
            {drawButtonDisabled.value ? (
              <Spinner
                height="1em"
                class="stroke-current"
                style={{ margin: '1.5px' }}
              />
            ) : (
              '만들기'
            )}
          </button>
          <div class="flex gap-[10px]">
            <button
              ref={copyButton}
              type="button"
              class="button big disabled flex-1"
              onClick$={(event, target) =>
                canvas.value!.toBlob((blob) => {
                  navigator.clipboard
                    .write([new ClipboardItem({ 'image/png': blob! })])
                    .then(
                      () => {
                        target.innerHTML = '복사됨!'
                        setTimeout(() => {
                          target.innerHTML = '복사하기'
                        }, 3000)
                      },
                      () => {
                        alert('이미지를 복사하지 못했습니다.')
                      },
                    )
                })
              }>
              복사하기
            </button>
            <a
              ref={downloadButton}
              href="#"
              download
              class="button big disabled flex-1">
              다운로드
            </a>
          </div>
        </form>
        <article class="prose prose-sm prose-zinc max-w-full">
          <h2>문자 집합</h2>
          <ul>
            <li>
              한글 음절
              <ul>
                <li>
                  2350자:{' '}
                  <ExternalLink
                    text="KS X 1001"
                    href="https://www.unicode.org/Public/MAPPINGS/OBSOLETE/EASTASIA/KSC/KSX1001.TXT"
                  />
                  의 모든 한글 음절.
                </li>
                <li>
                  2355자: KS X 1001의 모든 한글 음절에{' '}
                  <abbr title="KS X 1001에 포함된 뢨, 썅, 쏀, 쓩, 쭁을 입력하기 위한 보충 문자.">
                    뢔, 쌰, 쎼, 쓔, 쬬
                  </abbr>{' '}
                  5자가 추가된 집합.
                </li>
                <li>
                  2780자:{' '}
                  <ExternalLink
                    text="Adobe-KR-0"
                    href="https://github.com/adobe-type-tools/Adobe-KR"
                  />
                  의 모든 한글 음절. KS X 1001의 2350자를 포함합니다.
                </li>
                <li>
                  4358자: Adobe-KR-0과{' '}
                  <ExternalLink
                    text="Adobe-KR-1"
                    href="https://github.com/adobe-type-tools/Adobe-KR"
                  />
                  의 모든 한글 음절. KS X 1001,{' '}
                  <ExternalLink
                    text="KS X 1002"
                    href="https://en.wikipedia.org/wiki/KS_X_1002"
                  />
                  ,{' '}
                  <ExternalLink
                    text="KPS 9566"
                    href="https://www.unicode.org/L2/L2018/18011-info-kps9566-2011.pdf"
                  />
                  ,{' '}
                  <ExternalLink
                    text="GB/T 12052"
                    href="https://ccjktype.fonts.adobe.com/wp-content/uploads/2014/12/gb12052-uni.txt"
                  />
                  의 모든 한글 음절을 포함합니다.
                </li>
                <li>11172자: 현대 한글의 모든 음절.</li>
              </ul>
            </li>
            <li>
              EUC-KR
              <ul>
                <li>
                  한자 제외: KS X 1001와 KS X 1003을 포함하는 EUC-KR에서 한자를
                  제외한 문자 집합. 라틴 문자와 기호를 포함합니다.
                </li>
              </ul>
            </li>
            <li>
              일본 한자
              <ul>
                <li>
                  6355자:{' '}
                  <ExternalLink
                    text="Shift_JIS"
                    href="https://www.unicode.org/Public/MAPPINGS/OBSOLETE/EASTASIA/JIS/SHIFTJIS.TXT"
                  />
                  의 모든 한자.
                </li>
              </ul>
            </li>
          </ul>
          <p>Galmuri7은 한글 음절 11172자를 지원하지 않습니다.</p>
          <p>
            Galmuri11 Bold 및 Galmuri11 Condensed는 한자를 지원하지 않습니다.
          </p>
          <p>&copy; 2024 Lee Minseo</p>
        </article>
      </aside>
      <div class="flex flex-1 items-center justify-center self-stretch bg-zinc-50 min-h-40">
        <canvas id="preview" class="hidden max-w-full" ref={canvas} />
        {drawButtonDisabled.value ? (
          <Spinner height="2em" class="stroke-current" />
        ) : (
          <span class="canvas-placeholder m-4">
            폰트 이미지를 만들려면 조건을 설정하고 만들기 버튼을 누르세요.
          </span>
        )}
      </div>
    </main>
  )
})

export const head: DocumentHead = {
  title: '비트맵 폰트 이미지 생성기',
  meta: [
    {
      name: 'description',
      content: 'BDF 폰트를 사용하여 폰트 이미지를 만드는 도구.',
    },
    {
      property: 'og:title',
      content: '비트맵 폰트 이미지 생성기',
    },
    {
      property: 'og:description',
      content: 'BDF 폰트를 사용하여 폰트 이미지를 만드는 도구.',
    },
  ],
  links: [
    {
      rel: 'icon',
      type: 'image/svg+xml',
      href: '/images/q.svg',
    },
    {
      rel: 'mask-icon',
      type: 'image/svg+xml',
      href: '/images/q.svg',
    },
    {
      rel: 'apple-touch-icon',
      type: 'image/svg+xml',
      href: '/images/q.png',
    },
  ],
}

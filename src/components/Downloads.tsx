const fonts = ['14', '11', '11 Bold', '11 Condensed', '9', '7', 'Mono11', 'Mono9', 'Mono7']

export function Downloads() {
  return (
    <div>
      {fonts.map((font) => {
        return (
          <a key={font} href={`https://cdn.jsdelivr.net/npm/galmuri/dist/${font}.ttf`} download>
            Galmuri{font}
          </a>
        )
      })}
    </div>
  )
}

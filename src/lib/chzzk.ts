import type {AstroCookies} from 'astro'

export const getUser = async (cookies: AstroCookies) => {
  const response = await fetch('https://openapi.chzzk.naver.com/open/v1/users/me', {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${cookies.get('accessToken')?.value}`,
    },
  })
  return await response.json()
}

export const getChannel = async (channelIds: string[], locals: App.Locals) => {
  const {env} = locals.runtime
  const params = new URLSearchParams({
    channelIds: channelIds.join(','),
  })
  const response = await fetch(`https://openapi.chzzk.naver.com/open/v1/channels?${params}`, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
      'Client-Id': env.CHZZK_CLIENTID,
      'Client-Secret': env.CHZZK_CLIENTSECRET,
    },
  })
  return await response.json()
}

export const refreshAccessToken = async (cookies: AstroCookies, locals: App.Locals) => {
  const {env} = locals.runtime
  const response = await fetch('https://openapi.chzzk.naver.com/auth/v1/token', {
    method: 'post',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      grantType: 'refresh_token',
      clientId: env.CHZZK_CLIENTID,
      clientSecret: env.CHZZK_CLIENTSECRET,
      refreshToken: cookies.get('refreshToken')?.value,
    }),
  })
  const data = await response.json()

  if (data.code === 200) {
    console.log(data)
    cookies.set('accessToken', data.content.accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
    })
    return true
  }
  return false
}

export const checkSignedIn = async (cookies: AstroCookies, locals: App.Locals) => {
  if (cookies.has('accessToken')) {
    const user = await getUser(cookies)

    if (user.code === 200) {
      console.log(user)
      return true
    }

    if (user.code === 401 && cookies.has('refreshToken')) {
      const refresh = await refreshAccessToken(cookies, locals)

      if (refresh) {
        const user = await getUser(cookies)

        if (user.code === 200) {
          console.log(user)
          return true
        }
      }
      return false
    }
    return false
  }
  return false
}

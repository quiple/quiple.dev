import {sanityClient} from 'sanity:client'
import imageUrlBuilder from '@sanity/image-url'
import type {SanityAsset} from '@sanity/image-url/lib/types/types'
import type {QueryParams} from 'sanity'

export async function loadQuery<QueryResponse>({
  query,
  params,
}: {
  query: string
  params?: QueryParams
}) {
  const {result} = await sanityClient.fetch<QueryResponse>(query, params ?? {}, {
    filterResponse: false,
  })

  return {
    data: result,
  }
}

export const imageBuilder = imageUrlBuilder(sanityClient)

export function urlForImage(source: SanityAsset) {
  return imageBuilder.image(source)
}

import {sanityClient} from 'sanity:client'
import imageUrlBuilder from '@sanity/image-url'
import type {SanityAsset} from '@sanity/image-url/lib/types/types'

export const imageBuilder = imageUrlBuilder(sanityClient)

export const urlForImage = (source: SanityAsset) => {
  return imageBuilder.image(source)
}

export const getGalmuri = async () => {
  return await sanityClient.fetch(`*[_type == "galmuri"][0]`)
}

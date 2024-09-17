import { useWindowDimensions } from 'react-native'
import { AdvancedImage } from 'cloudinary-react-native'
import { ResizeMode, Video } from 'expo-av'

import { thumbnail, scale } from '@cloudinary/url-gen/actions/resize'

import { cld } from '../lib/cloudinary'

export type Post = {
  id: number
  image: string
  user: {
    avatar_url: string
    username: string
  }
  media_type: 'image' | 'video'
}

export default function PostContent({ post }: { post: Post }) {
  const { width } = useWindowDimensions()

  if (post.media_type === 'image') {
    const image = cld.image(post.image)
    image.resize(thumbnail().width(width).height(width))

    return <AdvancedImage cldImg={image} className="w-full aspect-[4/3]" />
  }

  if (post.media_type === 'video') {
    const video = cld.video(post.image)
    video.resize(scale().width(400))

    return (
      <Video
        className="w-52 aspect-[3/4] rounded-sm bg-slate-300"
        style={{ width: '100%', aspectRatio: 16 / 9 }}
        source={{
          uri: video.toURL(),
        }}
        useNativeControls
        resizeMode={ResizeMode.CONTAIN}
        isLooping
        // shouldPlay
      />
    )
  }
}

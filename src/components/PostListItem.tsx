import { View, Text, useWindowDimensions } from 'react-native'
import { Ionicons, Feather, AntDesign } from '@expo/vector-icons'

import { AdvancedImage, AdvancedVideo } from 'cloudinary-react-native'
// Import required actions and qualifiers.
import { thumbnail } from '@cloudinary/url-gen/actions/resize'
import { focusOn } from '@cloudinary/url-gen/qualifiers/gravity'
import { FocusOn } from '@cloudinary/url-gen/qualifiers/focusOn'
import { ResizeMode, Video } from 'expo-av'

import { cld } from '@/src/lib/cloudinary'

type Post = {
  image: string
  user: {
    avatar_url: string
    username: string
  }
  media_type: 'image' | 'video'
}

export default function PostListItem({ post }: { post: Post }) {
  const { width } = useWindowDimensions()

  const image = cld.image(post.image)
  image.resize(thumbnail().width(width).height(width))

  const avatar = cld.image(post.user.avatar_url || 'avatar_fwm2gr')
  avatar.resize(
    thumbnail().width(48).height(48).gravity(focusOn(FocusOn.face()))
  )

  const video = cld.video(post.image)

  return (
    <View className="bg-white">
      {/* Header */}
      <View className="p-3 flex-row items-center gap-2">
        <AdvancedImage
          cldImg={avatar}
          className="w-12 aspect-square rounded-full"
        />
        <Text className="font-semibold">
          {post.user.username || 'New user'}
        </Text>
      </View>

      {/* Content */}
      {post.media_type === 'image' ? (
        <AdvancedImage cldImg={image} className="w-full aspect-[4/3]" />
      ) : (
        // <AdvancedVideo
        //   cldVideo={video}
        //   videoStyle={{ width: '100%', aspectRatio: 4 / 3 }}
        // />
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
      )}

      {/* Icons */}
      <View className="flex-row">
        <View className="flex-row p-3 gap-3">
          <AntDesign name="hearto" size={20} />
          <Ionicons name="chatbubble-outline" size={20} />
          <Feather name="send" size={20} />
        </View>
        <View className="ml-auto p-3">
          <Feather name="bookmark" size={20} />
        </View>
      </View>
    </View>
  )
}

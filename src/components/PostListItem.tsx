import { View, Text } from 'react-native'
import { Ionicons, Feather, AntDesign } from '@expo/vector-icons'
import { AdvancedImage } from 'cloudinary-react-native'
import { thumbnail } from '@cloudinary/url-gen/actions/resize'
import { focusOn } from '@cloudinary/url-gen/qualifiers/gravity'
import { FocusOn } from '@cloudinary/url-gen/qualifiers/focusOn'

import { cld } from '@/src/lib/cloudinary'

import PostContent, { Post } from './PostContent'

export default function PostListItem({ post }: { post: Post }) {
  const avatar = cld.image(post.user.avatar_url || 'avatar_fwm2gr')
  avatar.resize(
    thumbnail().width(48).height(48).gravity(focusOn(FocusOn.face()))
  )

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
      <PostContent post={post} />

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

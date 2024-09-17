import { useEffect, useState } from 'react'
import { View, Image, Text, useWindowDimensions, Pressable } from 'react-native'
import { Ionicons, Feather, AntDesign } from '@expo/vector-icons'
import { AdvancedImage } from 'cloudinary-react-native'
import { thumbnail } from '@cloudinary/url-gen/actions/resize'
import { focusOn } from '@cloudinary/url-gen/qualifiers/gravity'
import { FocusOn } from '@cloudinary/url-gen/qualifiers/focusOn'

import { cld } from '@/src/lib/cloudinary'

import PostContent, { Post, LikeRecord } from './PostContent'
import { supabase } from '@/src/lib/supabase'
import { useAuth } from '@/src/providers/AuthProvider'

export default function PostListItem({ post }: { post: Post }) {
  const [isLiked, setIsLiked] = useState(false)
  const [likeRecord, setLikeRecord] = useState<LikeRecord | null>(null)
  const { user } = useAuth()

  useEffect(() => {
    if (post?.my_likes?.length > 0) {
      setLikeRecord(post.my_likes[0])
      setIsLiked(true)
    }
  }, [post.my_likes])

  useEffect(() => {
    if (isLiked) {
      saveLike()
    } else {
      deleteLike()
    }
  }, [isLiked])

  const saveLike = async () => {
    if (likeRecord) {
      return
    }
    const { data }: { data: LikeRecord | null } = await supabase
      .from('likes')
      .insert([{ user_id: user?.id, post_id: post.id }])
      .single()

    data && setLikeRecord(data)
  }

  const deleteLike = async () => {
    if (likeRecord) {
      const { error } = await supabase
        .from('likes')
        .delete()
        .eq('id', likeRecord.id)
      if (!error) {
        setLikeRecord(null)
      }
    }
  }

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
      {/* TODO: Double tab to like */}
      <PostContent post={post} />

      {/* Icons */}
      <View className="flex-row">
        <View className="flex-row p-3 gap-3">
          <AntDesign
            onPress={() => setIsLiked(!isLiked)}
            name={isLiked ? 'heart' : 'hearto'}
            size={20}
            color={isLiked ? 'crimson' : 'black'}
          />
          {/* TODO: Implement comments */}
          <Ionicons name="chatbubble-outline" size={20} />
          <Feather name="send" size={20} />
        </View>
        <View className="ml-auto p-3">
          <Feather name="bookmark" size={20} />
        </View>
      </View>
      <View className="px-3 gap-1">
        <Text className="font-semibold">58 likes</Text>
        <Text>
          <Text className="font-semibold">
            {post.user.username || 'New user'}{' '}
          </Text>
          {post.caption}
        </Text>
      </View>
    </View>
  )
}

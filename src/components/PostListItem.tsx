import { useEffect, useState, useCallback } from 'react'
import { View, Text, Pressable } from 'react-native'
import { Ionicons, Feather, AntDesign } from '@expo/vector-icons'
import { AdvancedImage } from 'cloudinary-react-native'
import { thumbnail } from '@cloudinary/url-gen/actions/resize'
import { focusOn } from '@cloudinary/url-gen/qualifiers/gravity'
import { FocusOn } from '@cloudinary/url-gen/qualifiers/focusOn'

import { cld } from '@/src/lib/cloudinary'

import PostContent from './PostContent'
import { supabase } from '@/src/lib/supabase'
import { useAuth } from '@/src/providers/AuthProvider'
import { Post, LikeRecord } from '@/src/lib/types'

const DOUBLE_PRESS_DELAY = 500

export default function PostListItem({ post }: { post: Post }) {
  const [isLiked, setIsLiked] = useState(false)
  const [likeRecord, setLikeRecord] = useState<LikeRecord | null>(null)
  const [postLikes, setPostLikes] = useState(post.likes?.[0]?.count || 0)
  const [lastPressed, setLastPressed] = useState(0)
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
      setPostLikes(postLikes + 1)
    } else {
      deleteLike()
      if (postLikes > 0) {
        setPostLikes(postLikes - 1)
      }
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

  // Implement like when user double tab
  const handlePress = useCallback(() => {
    const time = new Date().getTime()
    const delta = time - lastPressed
    setLastPressed(time)
    if (lastPressed) {
      if (delta < DOUBLE_PRESS_DELAY) {
        setIsLiked(true)
      }
    }
  }, [lastPressed])

  return (
    <Pressable onPress={handlePress}>
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
          <Text className="font-semibold">{postLikes} likes</Text>
          <Text>
            <Text className="font-semibold">
              {post.user.username || 'New user'}{' '}
            </Text>
            {post.caption}
          </Text>
        </View>
      </View>
    </Pressable>
  )
}

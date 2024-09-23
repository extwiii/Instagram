import { useEffect, useState, useCallback } from 'react'
import { View, Text, Pressable } from 'react-native'
import { Ionicons, Feather, AntDesign } from '@expo/vector-icons'

import { supabase } from '@/src/lib/supabase'
import { useAuth } from '@/src/providers/AuthProvider'
import { Post, LikeRecord } from '@/src/lib/types'

import PostContent from './PostContent'
import Avatar from './Avatar'
import { sendLikeNotification } from '../utils/notifications'

const DOUBLE_PRESS_DELAY = 500

type PostListItemProps = {
  post: Post
  handleCommentPress: (post: Post) => void
}

export default function PostListItem({
  post,
  handleCommentPress,
}: PostListItemProps) {
  const [isLiked, setIsLiked] = useState(false)
  const [likeRecord, setLikeRecord] = useState<LikeRecord | null>(null)
  const [lastPressed, setLastPressed] = useState(0)
  const { user } = useAuth()

  useEffect(() => {
    if (post.my_likes.length > 0) {
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
    const { data } = await supabase
      .from('likes')
      .insert([{ user_id: user?.id, post_id: post.id }])
      .select()
      .single()

    // send notification to the owner of that post
    sendLikeNotification(data)
    setLikeRecord(data)
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
          <Avatar url={post.user.avatar_url} />
          <Text className="font-semibold">
            {post.user.username || 'New user'}
          </Text>
        </View>

        {/* Content */}
        <PostContent post={post} />

        {/* Icons */}
        <View className="flex-row">
          <View className="flex-row p-3">
            <View className="flex-row pr-2 gap-1">
              <Pressable onPress={() => setIsLiked(!isLiked)}>
                <AntDesign
                  name={isLiked ? 'heart' : 'hearto'}
                  size={20}
                  color={isLiked ? 'crimson' : 'black'}
                />
              </Pressable>
              <Text className="font-semibold pt-0.5">
                {post.likes?.[0]?.count || 0}
              </Text>
            </View>

            {/** Comments */}
            <View className="flex-row pr-2 gap-1">
              <Pressable onPress={() => handleCommentPress(post)}>
                <Ionicons name="chatbubble-outline" size={20} />
              </Pressable>
              <Text className="font-semibold pt-0.5">
                {post.comments?.[0]?.count || 0}
              </Text>
            </View>
            <Feather name="send" size={20} />
          </View>
          <View className="ml-auto p-3">
            <Feather name="bookmark" size={20} />
          </View>
        </View>
        <View className="px-3">
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

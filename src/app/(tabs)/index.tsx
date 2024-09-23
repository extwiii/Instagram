import React, { useEffect, useState, useRef, useCallback } from 'react'
import { Alert, FlatList, Pressable, Text, View } from 'react-native'

import {
  BottomSheetBackdrop,
  BottomSheetFlatList,
  BottomSheetFooter,
  BottomSheetFooterProps,
  BottomSheetModal,
  BottomSheetTextInput,
  BottomSheetView,
} from '@gorhom/bottom-sheet'
import { Feather, AntDesign } from '@expo/vector-icons'

import PostListItem from '@/src/components/PostListItem'
import { supabase } from '@/src/lib/supabase'
import { useAuth } from '@/src/providers/AuthProvider'
import { CommentRecord, Post } from '@/src/lib/types'
import Avatar from '@/src/components/Avatar'

export default function FeedScreen() {
  const [posts, setPosts] = useState<Post[]>([])
  const [post, setPost] = useState<Post>()
  const [loading, setLoading] = useState(false)
  const [url, setUrl] = useState('')

  const sheetRef = useRef<BottomSheetModal>(null)

  const { user } = useAuth()

  useEffect(() => {
    fetchPosts()
    getProfile()
  }, [])

  const fetchPosts = async () => {
    setLoading(true)
    let { data, error } = await supabase
      .from('posts')
      .select(
        '*, user:profiles(*), my_likes:likes(*), likes(count), my_comments:comments(*), comments(count)'
      )
      .eq('my_likes.user_id', user?.id)
      .order('created_at', { ascending: false })
      .order('created_at', { referencedTable: 'my_comments', ascending: false })

    if (error) {
      Alert.alert('Something went wrong')
    }
    if (data && data?.length > 0) {
      setPosts(data)
    }

    setLoading(false)
  }

  const getProfile = async () => {
    if (!user) {
      return
    }
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single()

    if (error) {
      Alert.alert('Failed to fetch profile')
    }
    setUrl(data.avatar_url)
  }

  const snapPoints = ['70%', '94%']

  const handleCommentPress = (post: Post) => {
    sheetRef.current?.present()
    setPost(post)
  }

  const handleSendComment = async (comment: string) => {
    const { error } = await supabase.from('comments').insert({
      user_id: user?.id,
      post_id: post?.id,
      comment,
      avatar_url: url,
      username: post?.user.username,
    })
    if (error) {
      Alert.alert('Failed to send comment')
    }
    sheetRef.current?.dismiss()
  }

  const handleUpdateComment = async (item: CommentRecord) => {
    const { data, error } = await supabase
      .from('comments')
      .update({
        likes: item.likes ? item.likes + 1 : 1,
      })
      .eq('id', item.id)
    if (error) {
      Alert.alert('Failed to send comment')
    }
  }

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        {...props}
      />
    ),
    []
  )

  const renderFooter = useCallback(
    (props: BottomSheetFooterProps) => {
      const [comment, setComment] = useState('')
      return (
        <BottomSheetFooter {...props}>
          <View className="flex-row p-2 gap-0 bg-white pb-6">
            <Avatar url={url} />
            <View className="border border-solid flex-1 border-neutral-300 rounded-3xl">
              <BottomSheetTextInput
                onChangeText={setComment}
                placeholder={`Add a comment for ${post?.user?.username}`}
                style={{
                  width: '100%',
                  padding: 14,
                }}
                placeholderTextColor="grey"
              />
            </View>
            <Pressable onPress={() => handleSendComment(comment)}>
              <Feather
                name="send"
                size={24}
                style={{
                  paddingHorizontal: 10,
                  paddingTop: 14,
                }}
              />
            </Pressable>
          </View>
        </BottomSheetFooter>
      )
    },
    [post?.user?.username]
  )

  const hasComments = post?.comments[0]?.count! > 0

  return (
    <>
      <FlatList
        data={posts}
        renderItem={({ item }) => (
          <PostListItem post={item} handleCommentPress={handleCommentPress} />
        )}
        contentContainerStyle={{
          gap: 10,
          maxWidth: 512,
          width: '100%',
          alignSelf: 'center',
        }}
        showsVerticalScrollIndicator={false}
        onRefresh={fetchPosts}
        refreshing={loading}
      />
      <BottomSheetModal
        ref={sheetRef}
        snapPoints={snapPoints}
        enablePanDownToClose
        backdropComponent={renderBackdrop}
        footerComponent={renderFooter}
        // onChange={handleSheetChange}
        // backgroundStyle={{ backgroundColor: '#EEE' }}
        // handleIndicatorStyle={{ backgroundColor: '#999' }}
      >
        {hasComments ? (
          <>
            <Text className="font-bold text-lg text-center p-2">Comments</Text>
            <BottomSheetFlatList
              data={post?.my_comments}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <View key={item.id} className="flex-row p-3 items-center">
                  <Avatar url={item?.avatar_url} size={36} />
                  <View className="flex-row flex-1 pl-2">
                    <View>
                      <Text className="text-sm">{item.username}</Text>
                      <Text className="font-bold text-sm pt-0.5">
                        {item.comment}
                      </Text>
                    </View>
                    <View className="ml-auto justify-center p-1">
                      <Pressable onPress={() => handleUpdateComment(item)}>
                        <AntDesign
                          name={item?.likes ? 'heart' : 'hearto'}
                          size={12}
                          color={item?.likes ? 'crimson' : 'black'}
                        />
                        <Text className="text-xs pl-0.5">{item?.likes}</Text>
                      </Pressable>
                    </View>
                  </View>
                </View>
              )}
              style={{ marginBottom: 80 }}
              showsVerticalScrollIndicator={false}
            />
          </>
        ) : (
          <BottomSheetView>
            <View className="flex items-center">
              <Text className="font-bold">Comments</Text>
              <Text className="font-bold pt-1">No comments yet</Text>
            </View>
          </BottomSheetView>
        )}
      </BottomSheetModal>
    </>
  )
}

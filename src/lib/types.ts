export type LikeRecord = {
  id: number
  created_at: string
  post_id: number
  user_id: string
}

export type Post = {
  id: number
  image: string
  user: {
    avatar_url: string
    username: string
  }
  media_type: 'image' | 'video'
  caption: string
  my_likes: LikeRecord[]
  likes: {
    count: number
  }[]
}

export type MessageType = {
  to: any
  sound: string
  title: string
  body: string
  data: {
    postId: any
  }
}

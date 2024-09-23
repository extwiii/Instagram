export type Record = {
  id: number
  created_at: string
  post_id: number
  user_id: string
}

export type LikeRecord = Record

export type CommentRecord = {
  likes: number
  comment: string
  avatar_url?: string
  username?: string
} & Record

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
  my_comments: CommentRecord[]
  comments: {
    count: number
  }[]
}

export type MessageType = {
  to: any
  sound: string
  title: string
  subtitle: string
  data: {
    postId: any
  }
}

export type ProfileType = {
  id: string
  username: string
  avatar_url?: string
  bio?: string
}

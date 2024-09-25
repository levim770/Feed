export interface PostProps {
  userId: number;
  id: number;
  title: string;
  body: string;
  views: number;
  tags: string[];
  reactions: {
    dislikes: number;
    likes: number;
  };
}

export interface CommentProps {
  id: number;
  body: string;
  postId: number;
  likes: number;
  user: {
    id: number;
    username: string;
    fullName: string;
  };
}

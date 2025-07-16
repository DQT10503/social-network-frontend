import { User } from './user.interface';

export interface Post {
  id: string;
  content: string;
  images?: string[];
  author: User;
  likes: number;
  comments: number;
  isLiked?: boolean;
  createdAt: Date;
}

export interface Comment {
  id: string;
  content: string;
  author: User;
  post: Post;
  likes: number;
  isLiked?: boolean;
  createdAt: Date;
}

export interface CreatePostRequest {
  content: string;
  images?: File[];
}

export interface CreateCommentRequest {
  content: string;
  postId: string;
} 
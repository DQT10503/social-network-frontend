import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post, Comment, CreatePostRequest, CreateCommentRequest } from '../models/post.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  constructor(private http: HttpClient) {}

  getPosts(page: number = 1, limit: number = 10): Observable<Post[]> {
    return this.http.get<Post[]>(`${environment.apiAuthUrl}/posts`, {
      params: { page: page.toString(), limit: limit.toString() }
    });
  }

  getPost(id: string): Observable<Post> {
    return this.http.get<Post>(`${environment.apiAuthUrl}/posts/${id}`);
  }

  createPost(data: CreatePostRequest): Observable<Post> {
    const formData = new FormData();
    formData.append('content', data.content);
    if (data.images) {
      data.images.forEach(image => formData.append('images', image));
    }
    return this.http.post<Post>(`${environment.apiAuthUrl}/posts`, formData);
  }

  updatePost(id: string, content: string): Observable<Post> {
    return this.http.put<Post>(`${environment.apiAuthUrl}/posts/${id}`, { content });
  }

  deletePost(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.apiAuthUrl}/posts/${id}`);
  }

  likePost(id: string): Observable<void> {
    return this.http.post<void>(`${environment.apiAuthUrl}/posts/${id}/like`, {});
  }

  unlikePost(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.apiAuthUrl}/posts/${id}/like`);
  }

  getComments(postId: string, page: number = 1, limit: number = 10): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${environment.apiAuthUrl}/posts/${postId}/comments`, {
      params: { page: page.toString(), limit: limit.toString() }
    });
  }

  createComment(data: CreateCommentRequest): Observable<Comment> {
    return this.http.post<Comment>(`${environment.apiAuthUrl}/posts/${data.postId}/comments`, {
      content: data.content
    });
  }

  deleteComment(postId: string, commentId: string): Observable<void> {
    return this.http.delete<void>(`${environment.apiAuthUrl}/posts/${postId}/comments/${commentId}`);
  }
} 
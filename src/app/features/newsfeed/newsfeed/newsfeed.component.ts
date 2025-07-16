import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

interface Post {
  id: string;
  author: {
    id: string;
    name: string;
    avatar: string;
  };
  content: string;
  images?: string[];
  likes: number;
  comments: number;
  shares: number;
  createdAt: Date;
  isLiked: boolean;
}

@Component({
  selector: 'app-newsfeed',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule
  ],
  template: `
    <div class="newsfeed-container">
      <div class="content-container">
        <!-- Create Post Card -->
        <mat-card class="create-post-card">
          <div class="create-post-header">
            <img src="assets/images/default-avatar.png" alt="User Avatar" class="avatar">
            <mat-form-field class="post-input">
              <input matInput placeholder="Bạn đang nghĩ gì?" (click)="openCreatePostDialog()">
            </mat-form-field>
          </div>
          <mat-divider></mat-divider>
          <div class="create-post-actions">
            <button mat-button color="primary" (click)="openCreatePostDialog()">
              <mat-icon>photo_library</mat-icon>
              <span>Ảnh/Video</span>
            </button>
            <button mat-button color="accent" (click)="openCreatePostDialog()">
              <mat-icon>emoji_emotions</mat-icon>
              <span>Cảm xúc</span>
            </button>
            <button mat-button color="warn" (click)="openCreatePostDialog()">
              <mat-icon>location_on</mat-icon>
              <span>Check in</span>
            </button>
          </div>
        </mat-card>

        <!-- Posts -->
        <div class="posts-container">
          <mat-card *ngFor="let post of posts" class="post-card">
            <mat-card-header>
              <img mat-card-avatar [src]="post.author.avatar" [alt]="post.author.name">
              <mat-card-title>{{ post.author.name }}</mat-card-title>
              <mat-card-subtitle>{{ post.createdAt | date:'medium' }}</mat-card-subtitle>
              <button mat-icon-button [matMenuTriggerFor]="postMenu" class="post-menu-button">
                <mat-icon>more_vert</mat-icon>
              </button>
              <mat-menu #postMenu="matMenu">
                <button mat-menu-item>
                  <mat-icon>bookmark</mat-icon>
                  <span>Lưu bài viết</span>
                </button>
                <button mat-menu-item>
                  <mat-icon>report</mat-icon>
                  <span>Báo cáo bài viết</span>
                </button>
              </mat-menu>
            </mat-card-header>

            <mat-card-content>
              <p>{{ post.content }}</p>
              <div *ngIf="post.images && post.images.length > 0" class="post-images">
                <img *ngFor="let image of post.images" [src]="image" alt="Post image" class="post-image">
              </div>
            </mat-card-content>

            <div class="post-stats">
              <span>{{ post.likes }} lượt thích</span>
              <span>{{ post.comments }} bình luận</span>
              <span>{{ post.shares }} chia sẻ</span>
            </div>

            <mat-divider></mat-divider>

            <mat-card-actions>
              <button mat-button (click)="toggleLike(post)" [class.liked]="post.isLiked">
                <mat-icon>{{ post.isLiked ? 'favorite' : 'favorite_border' }}</mat-icon>
                <span>Thích</span>
              </button>
              <button mat-button>
                <mat-icon>chat_bubble_outline</mat-icon>
                <span>Bình luận</span>
              </button>
              <button mat-button>
                <mat-icon>share</mat-icon>
                <span>Chia sẻ</span>
              </button>
            </mat-card-actions>

            <!-- Comment section -->
            <mat-divider></mat-divider>
            <div class="comment-section">
              <div class="comment-input">
                <img src="assets/images/default-avatar.png" alt="User Avatar" class="avatar">
                <mat-form-field class="comment-field">
                  <input matInput placeholder="Viết bình luận..." [(ngModel)]="commentText">
                  <button mat-icon-button matSuffix (click)="addComment(post)" [disabled]="!commentText">
                    <mat-icon>send</mat-icon>
                  </button>
                </mat-form-field>
              </div>
            </div>
          </mat-card>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .newsfeed-container {
      padding-bottom: 20px;
      background-color: #f0f2f5;
      min-height: 100vh;
    }

    .content-container {
      max-width: 680px;
      margin: 0 auto;
      padding: 0 16px;
    }

    .create-post-card {
      margin-bottom: 20px;
      border-radius: 8px;
    }

    .create-post-header {
      display: flex;
      align-items: center;
      padding: 12px 16px;
    }

    .avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      margin-right: 12px;
      object-fit: cover;
    }

    .post-input {
      flex: 1;
    }

    .create-post-actions {
      display: flex;
      justify-content: space-around;
      padding: 8px;
    }

    .post-card {
      margin-bottom: 20px;
      border-radius: 8px;
    }

    .post-menu-button {
      margin-left: auto;
    }

    .post-images {
      display: flex;
      flex-wrap: wrap;
      margin-top: 12px;
    }

    .post-image {
      max-width: 100%;
      border-radius: 8px;
      margin-bottom: 8px;
    }

    .post-stats {
      display: flex;
      justify-content: space-between;
      padding: 8px 16px;
      color: #65676b;
      font-size: 14px;
    }

    mat-card-actions {
      display: flex;
      justify-content: space-around;
      padding: 4px;
    }

    .liked {
      color: #e91e63;
    }

    .comment-section {
      padding: 8px 16px;
    }

    .comment-input {
      display: flex;
      align-items: center;
    }

    .comment-field {
      flex: 1;
    }
  `]
})
export class NewsfeedComponent implements OnInit {
  posts: Post[] = [];
  commentText = '';

  constructor() {}

  ngOnInit(): void {
    // Mock data
    this.posts = [
      {
        id: '1',
        author: {
          id: '1',
          name: 'Nguyễn Văn A',
          avatar: 'assets/images/default-avatar.png'
        },
        content: 'Hôm nay là một ngày tuyệt vời! 🌞',
        images: ['assets/images/post1.jpg'],
        likes: 15,
        comments: 3,
        shares: 1,
        createdAt: new Date(),
        isLiked: false
      },
      {
        id: '2',
        author: {
          id: '2',
          name: 'Trần Thị B',
          avatar: 'assets/images/default-avatar.png'
        },
        content: 'Vừa đi du lịch Đà Lạt về, chia sẻ với mọi người vài tấm hình đẹp nhé! 📸',
        images: ['assets/images/post2.jpg', 'assets/images/post3.jpg'],
        likes: 42,
        comments: 7,
        shares: 5,
        createdAt: new Date(Date.now() - 86400000), // 1 day ago
        isLiked: true
      }
    ];
  }

  toggleLike(post: Post): void {
    post.isLiked = !post.isLiked;
    post.likes += post.isLiked ? 1 : -1;
  }

  openCreatePostDialog(): void {
    // TODO: Implement create post dialog
    console.log('Open create post dialog');
  }

  addComment(post: Post): void {
    if (this.commentText.trim()) {
      post.comments++;
      // TODO: Implement add comment functionality
      console.log('Added comment to post', post.id, this.commentText);
      this.commentText = '';
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';

interface User {
  id: string;
  fullName: string;
  email: string;
  avatar?: string;
  bio?: string;
  isFriend: boolean;
}

interface Post {
  id: string;
  content: string;
  images?: string[];
  likes: number;
  comments: number;
  shares: number;
  createdAt: Date;
}

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    MatDividerModule,
    MatMenuModule
  ],
  template: `
    <div class="profile-container">
      <div class="profile-header">
        <div class="cover-photo">
          <img src="assets/images/cover-photo.jpg" alt="Cover Photo">
        </div>
        
        <div class="profile-info">
          <div class="avatar-container">
            <img [src]="user?.avatar || 'assets/images/default-avatar.png'" 
                 [alt]="user?.fullName" 
                 class="profile-avatar">
          </div>
          
          <div class="user-info">
            <h1 class="user-name">{{ user?.fullName }}</h1>
            <p class="user-bio">{{ user?.bio || 'Chưa có thông tin giới thiệu' }}</p>
          </div>
          
          <div class="profile-actions">
            <button mat-raised-button color="primary" *ngIf="!user?.isFriend" (click)="addFriend()">
              <mat-icon>person_add</mat-icon>
              Kết bạn
            </button>
            <button mat-raised-button color="primary" *ngIf="user?.isFriend">
              <mat-icon>check</mat-icon>
              Bạn bè
            </button>
            <button mat-raised-button color="accent" [routerLink]="['/messages', user?.id]">
              <mat-icon>chat</mat-icon>
              Nhắn tin
            </button>
          </div>
        </div>
      </div>
      
      <div class="profile-content">
        <mat-card class="profile-stats">
          <div class="stat-item">
            <span class="stat-value">{{ posts.length }}</span>
            <span class="stat-label">Bài viết</span>
          </div>
          <mat-divider [vertical]="true"></mat-divider>
          <div class="stat-item">
            <span class="stat-value">{{ friends }}</span>
            <span class="stat-label">Bạn bè</span>
          </div>
          <mat-divider [vertical]="true"></mat-divider>
          <div class="stat-item">
            <span class="stat-value">{{ photos }}</span>
            <span class="stat-label">Ảnh</span>
          </div>
        </mat-card>
        
        <mat-tab-group animationDuration="0ms" class="profile-tabs">
          <mat-tab label="Bài viết">
            <div class="tab-content">
              <div class="posts-container">
                <mat-card *ngFor="let post of posts" class="post-card">
                  <mat-card-header>
                    <img mat-card-avatar [src]="user?.avatar || 'assets/images/default-avatar.png'" 
                         [alt]="user?.fullName">
                    <mat-card-title>{{ user?.fullName }}</mat-card-title>
                    <mat-card-subtitle>{{ post.createdAt | date:'medium' }}</mat-card-subtitle>
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
                    <button mat-button (click)="likePost(post)">
                      <mat-icon>thumb_up</mat-icon>
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
                </mat-card>
                
                <div *ngIf="posts.length === 0" class="no-posts">
                  <mat-icon>article</mat-icon>
                  <p>Không có bài viết nào</p>
                </div>
              </div>
            </div>
          </mat-tab>
          
          <mat-tab label="Giới thiệu">
            <div class="tab-content">
              <mat-card class="about-card">
                <mat-card-header>
                  <mat-card-title>Thông tin cá nhân</mat-card-title>
                </mat-card-header>
                <mat-card-content>
                  <div class="info-item">
                    <mat-icon>email</mat-icon>
                    <span>{{ user?.email }}</span>
                  </div>
                  <div class="info-item">
                    <mat-icon>cake</mat-icon>
                    <span>Ngày sinh: Chưa cập nhật</span>
                  </div>
                  <div class="info-item">
                    <mat-icon>location_on</mat-icon>
                    <span>Địa chỉ: Chưa cập nhật</span>
                  </div>
                  <div class="info-item">
                    <mat-icon>work</mat-icon>
                    <span>Công việc: Chưa cập nhật</span>
                  </div>
                  <div class="info-item">
                    <mat-icon>school</mat-icon>
                    <span>Học vấn: Chưa cập nhật</span>
                  </div>
                </mat-card-content>
              </mat-card>
            </div>
          </mat-tab>
          
          <mat-tab label="Bạn bè">
            <div class="tab-content">
              <mat-card class="friends-card">
                <mat-card-header>
                  <mat-card-title>Bạn bè ({{ friends }})</mat-card-title>
                </mat-card-header>
                <mat-card-content>
                  <p *ngIf="friends === 0">Người dùng chưa có bạn bè nào.</p>
                  <div class="friends-grid" *ngIf="friends > 0">
                    <!-- Mock friends -->
                    <div class="friend-item" *ngFor="let i of [1, 2, 3, 4, 5, 6]">
                      <img src="assets/images/default-avatar.png" alt="Friend Avatar" class="friend-avatar">
                      <div class="friend-info">
                        <h3>Người dùng {{ i }}</h3>
                        <button mat-button color="primary" [routerLink]="['/profile', i]">
                          <mat-icon>person</mat-icon>
                          Xem trang cá nhân
                        </button>
                      </div>
                    </div>
                  </div>
                </mat-card-content>
              </mat-card>
            </div>
          </mat-tab>
          
          <mat-tab label="Ảnh">
            <div class="tab-content">
              <mat-card class="photos-card">
                <mat-card-header>
                  <mat-card-title>Ảnh ({{ photos }})</mat-card-title>
                </mat-card-header>
                <mat-card-content>
                  <p *ngIf="photos === 0">Người dùng chưa có ảnh nào.</p>
                  <div class="photos-grid" *ngIf="photos > 0">
                    <!-- Mock photos -->
                    <div class="photo-item" *ngFor="let i of [1, 2, 3, 4, 5, 6, 7, 8, 9]">
                      <img src="assets/images/post{{i % 3 + 1}}.jpg" alt="Photo" class="photo-image">
                    </div>
                  </div>
                </mat-card-content>
              </mat-card>
            </div>
          </mat-tab>
        </mat-tab-group>
      </div>
    </div>
  `,
  styles: [`
    .profile-container {
      padding-top: 64px;
      background-color: #f0f2f5;
      min-height: 100vh;
    }

    .profile-header {
      background-color: white;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
      margin-bottom: 20px;
    }

    .cover-photo {
      position: relative;
      height: 300px;
      overflow: hidden;
    }

    .cover-photo img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .profile-info {
      display: flex;
      padding: 0 16px 16px;
      position: relative;
    }

    .avatar-container {
      position: relative;
      margin-top: -80px;
      margin-right: 24px;
    }

    .profile-avatar {
      width: 160px;
      height: 160px;
      border-radius: 50%;
      border: 4px solid white;
      background-color: white;
      object-fit: cover;
    }

    .user-info {
      flex: 1;
      padding-top: 16px;
    }

    .user-name {
      margin: 0 0 8px;
      font-size: 24px;
    }

    .user-bio {
      margin: 0;
      color: #65676b;
    }

    .profile-actions {
      display: flex;
      align-items: flex-end;
      padding-bottom: 16px;
      gap: 8px;
    }

    .profile-content {
      max-width: 1000px;
      margin: 0 auto;
      padding: 0 16px;
    }

    .profile-stats {
      display: flex;
      justify-content: space-around;
      padding: 16px;
      margin-bottom: 20px;
    }

    .stat-item {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .stat-value {
      font-size: 20px;
      font-weight: 500;
    }

    .stat-label {
      color: #65676b;
    }

    .profile-tabs {
      background-color: white;
      border-radius: 8px;
      overflow: hidden;
    }

    .tab-content {
      padding: 16px;
    }

    .post-card {
      margin-bottom: 20px;
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

    .about-card {
      margin-bottom: 20px;
    }

    .info-item {
      display: flex;
      align-items: center;
      margin-bottom: 12px;
    }

    .info-item mat-icon {
      margin-right: 12px;
      color: #3f51b5;
    }

    .friends-grid, .photos-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 16px;
      margin-top: 16px;
    }

    .friend-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
    }

    .friend-avatar {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      margin-bottom: 8px;
      object-fit: cover;
    }

    .friend-info h3 {
      margin: 0 0 8px;
      font-size: 16px;
    }

    .photo-item {
      aspect-ratio: 1;
      overflow: hidden;
      border-radius: 8px;
    }

    .photo-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .no-posts {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 32px;
      color: #65676b;
    }

    .no-posts mat-icon {
      font-size: 48px;
      height: 48px;
      width: 48px;
      margin-bottom: 16px;
    }

    @media (max-width: 768px) {
      .profile-info {
        flex-direction: column;
        align-items: center;
        text-align: center;
      }

      .avatar-container {
        margin-right: 0;
        margin-bottom: 16px;
      }

      .profile-actions {
        justify-content: center;
        padding-top: 16px;
      }

      .friends-grid, .photos-grid {
        grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
      }
    }
  `]
})
export class UserProfileComponent implements OnInit {
  userId: string = '';
  user: User | null = null;
  posts: Post[] = [];
  friends: number = 6;
  photos: number = 9;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.userId = params['id'];
      this.loadUserProfile();
    });
  }

  loadUserProfile(): void {
    // Mock data - in a real app, fetch from a service
    this.user = {
      id: this.userId,
      fullName: 'Nguyễn Văn A',
      email: 'nguyenvana@example.com',
      avatar: 'assets/images/default-avatar.png',
      bio: 'Xin chào, tôi là Nguyễn Văn A. Tôi đam mê công nghệ và thích khám phá những điều mới mẻ.',
      isFriend: false
    };

    this.posts = [
      {
        id: '1',
        content: 'Hôm nay là một ngày tuyệt vời! 🌞',
        images: ['assets/images/post1.jpg'],
        likes: 15,
        comments: 3,
        shares: 1,
        createdAt: new Date()
      },
      {
        id: '2',
        content: 'Vừa đi du lịch Đà Lạt về, chia sẻ với mọi người vài tấm hình đẹp nhé! 📸',
        images: ['assets/images/post2.jpg', 'assets/images/post3.jpg'],
        likes: 42,
        comments: 7,
        shares: 5,
        createdAt: new Date(Date.now() - 86400000) // 1 day ago
      }
    ];
  }

  addFriend(): void {
    if (this.user) {
      this.user.isFriend = true;
      // TODO: Implement add friend functionality
      console.log('Added friend:', this.user.id);
    }
  }

  likePost(post: Post): void {
    post.likes++;
    // TODO: Implement like post functionality
    console.log('Liked post:', post.id);
  }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet, Router, ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { MatBadgeModule } from '@angular/material/badge';
import { ConversationComponent } from '../conversation/conversation.component';
import { Subject } from 'rxjs';

interface Conversation {
  id: string;
  user: {
    id: string;
    name: string;
    avatar: string;
    isOnline: boolean;
  };
  lastMessage: {
    text: string;
    time: Date;
    isRead: boolean;
    isOwnMessage: boolean;
  };
  unreadCount: number;
}

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterOutlet,
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatDividerModule,
    MatBadgeModule,
    ConversationComponent
  ],
  template: `
    <div class="message-container">
      <div class="sidebar">
        <div class="search-container">
          <mat-form-field class="search-field">
            <mat-label>Tìm kiếm</mat-label>
            <input matInput [(ngModel)]="searchText" placeholder="Tìm kiếm cuộc trò chuyện">
            <button *ngIf="searchText" matSuffix mat-icon-button (click)="searchText = ''">
              <mat-icon>close</mat-icon>
            </button>
            <mat-icon matPrefix>search</mat-icon>
          </mat-form-field>
        </div>

        <mat-divider></mat-divider>

        <mat-nav-list class="conversation-list">
          <div *ngFor="let conversation of filteredConversations" 
               class="conversation-item"
               [class.active-conversation]="selectedConversation?.id === conversation.id"
               (click)="selectConversation(conversation)">
            <div class="avatar-container">
              <img [src]="conversation.user.avatar" [alt]="conversation.user.name" class="avatar">
              <div class="online-indicator" *ngIf="conversation.user.isOnline"></div>
            </div>
            <div class="conversation-info">
              <div class="conversation-header">
                <h3 class="user-name">{{ conversation.user.name }}</h3>
                <span class="message-time">{{ conversation.lastMessage.time | date:'shortTime' }}</span>
              </div>
              <div class="conversation-preview">
                <p class="message-preview" [class.unread]="!conversation.lastMessage.isRead">
                  <span *ngIf="conversation.lastMessage.isOwnMessage">Bạn: </span>
                  {{ conversation.lastMessage.text }}
                </p>
                <div *ngIf="conversation.unreadCount > 0" class="unread-badge">
                  {{ conversation.unreadCount }}
                </div>
              </div>
            </div>
          </div>
        </mat-nav-list>
      </div>

      <div class="content">
        <router-outlet></router-outlet>
        
        <div *ngIf="!selectedConversation" class="no-conversation">
          <mat-icon class="no-conversation-icon">chat</mat-icon>
          <h2>Tin nhắn của bạn</h2>
          <p>Chọn một cuộc trò chuyện để bắt đầu</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .message-container {
      display: flex;
      height: calc(100vh - 64px);
      background-color: white;
      overflow: hidden;
    }

    .sidebar {
      width: 360px;
      background-color: white;
      border-right: 1px solid #e4e4e4;
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }

    .search-container {
      padding: 12px 12px;
      border-bottom: 1px solid #e4e4e4;
    }

    .search-field {
      width: 100%;
    }

    .search-field ::ng-deep .mat-mdc-text-field-wrapper {
      background-color: #f0f2f5;
      border-radius: 50px;
      padding: 0 12px;
    }

    .search-field ::ng-deep .mat-mdc-form-field-flex {
      min-height: unset;
    }

    .search-field ::ng-deep .mat-mdc-form-field-infix {
      padding: 8px 0;
    }

    .search-field ::ng-deep .mat-mdc-form-field-subscript-wrapper {
      display: none;
    }

    .conversation-list {
      flex: 1;
      overflow-y: auto;
      padding: 8px 0;
    }

    .conversation-item {
      display: flex;
      align-items: center;
      padding: 8px 12px;
      cursor: pointer;
      transition: all 0.2s ease;
      border-radius: 8px;
      margin: 0 8px;
      min-height: 64px;
    }

    .conversation-item:hover {
      background-color: #f0f2f5;
    }

    .active-conversation {
      background-color: #e7f3ff;
    }

    .avatar-container {
      position: relative;
      margin-right: 12px;
    }

    .avatar {
      width: 56px;
      height: 56px;
      border-radius: 50%;
      object-fit: cover;
    }

    .online-indicator {
      position: absolute;
      bottom: 2px;
      right: 2px;
      width: 12px;
      height: 12px;
      background-color: #31a24c;
      border: 2px solid white;
      border-radius: 50%;
    }

    .conversation-info {
      flex: 1;
      min-width: 0;
      padding: 4px 0;
    }

    .conversation-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 4px;
    }

    .user-name {
      margin: 0;
      font-size: 15px;
      font-weight: 500;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      color: #050505;
    }

    .message-time {
      font-size: 12px;
      color: #65676b;
    }

    .conversation-preview {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .message-preview {
      margin: 0;
      font-size: 13px;
      color: #65676b;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      flex: 1;
      line-height: 1.4;
    }

    .message-preview.unread {
      color: #050505;
      font-weight: 500;
    }

    .unread-badge {
      background-color: #0084ff;
      color: white;
      border-radius: 50%;
      min-width: 20px;
      height: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      padding: 0 6px;
      margin-left: 8px;
    }

    .content {
      flex: 1;
      display: flex;
      flex-direction: column;
      background-color: white;
      overflow: hidden;
      position: relative;
    }

    .content > :first-child {
      flex: 1;
      overflow: hidden;
    }

    .no-conversation {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      color: #65676b;
    }

    .no-conversation-icon {
      font-size: 48px;
      width: 48px;
      height: 48px;
      margin-bottom: 16px;
      color: #65676b;
    }

    .no-conversation h2 {
      margin: 0 0 8px 0;
      font-size: 20px;
      font-weight: 500;
      color: #050505;
    }

    .no-conversation p {
      margin: 0;
      font-size: 14px;
      color: #65676b;
    }
  `]
})
export class MessageComponent implements OnInit, OnDestroy {
  conversations: Conversation[] = [];
  filteredConversations: Conversation[] = [];
  searchText = '';
  selectedConversation: Conversation | null = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Mock data
    this.conversations = [
      {
        id: '1',
        user: {
          id: '1',
          name: 'Nguyễn Văn A',
          avatar: 'assets/images/default-avatar.png',
          isOnline: true
        },
        lastMessage: {
          text: 'Hẹn gặp lại bạn vào ngày mai nhé!',
          time: new Date(),
          isRead: false,
          isOwnMessage: false
        },
        unreadCount: 2
      },
      {
        id: '2',
        user: {
          id: '2',
          name: 'Trần Thị B',
          avatar: 'assets/images/default-avatar.png',
          isOnline: false
        },
        lastMessage: {
          text: 'Cảm ơn bạn rất nhiều!',
          time: new Date(Date.now() - 3600000), // 1 hour ago
          isRead: true,
          isOwnMessage: true
        },
        unreadCount: 0
      },
      {
        id: '3',
        user: {
          id: '3',
          name: 'Lê Văn C',
          avatar: 'assets/images/default-avatar.png',
          isOnline: true
        },
        lastMessage: {
          text: 'Bạn có thể gửi cho mình tài liệu đó được không?',
          time: new Date(Date.now() - 86400000), // 1 day ago
          isRead: true,
          isOwnMessage: false
        },
        unreadCount: 0
      }
    ];

    this.filteredConversations = [...this.conversations];
    this.watchSearchText();

    // Lắng nghe thay đổi params để cập nhật conversation được chọn
    this.route.params.subscribe(params => {
      if (params['id']) {
        const conversation = this.conversations.find(c => c.id === params['id']);
        if (conversation) {
          this.selectedConversation = conversation;
        }
      }
    });
  }

  selectConversation(conversation: Conversation): void {
    this.selectedConversation = conversation;
    // Cập nhật URL khi chọn conversation
    this.router.navigate(['/messages', conversation.id]);
  }

  watchSearchText(): void {
    // In a real app, use debounce with RxJS
    setInterval(() => {
      if (this.searchText) {
        this.filteredConversations = this.conversations.filter(conv => 
          conv.user.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
          conv.lastMessage.text.toLowerCase().includes(this.searchText.toLowerCase())
        );
      } else {
        this.filteredConversations = [...this.conversations];
      }
    }, 300);
  }

  ngOnDestroy(): void {
    // Cleanup code if needed
  }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

interface Message {
  id: string;
  text: string;
  time: Date;
  isOwn: boolean;
  status?: 'sent' | 'delivered' | 'read';
}

interface User {
  id: string;
  name: string;
  avatar: string;
  isOnline: boolean;
  lastActive?: Date;
}

@Component({
  selector: 'app-conversation',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule
  ],
  template: `
    <div class="messenger-chat-container">
      <div class="messenger-header">
        <div class="user-info">
          <img [src]="user?.avatar" [alt]="user?.name" class="avatar">
          <div class="user-details">
            <div class="user-name">{{ user?.name }}</div>
            <div class="user-status">{{ user?.isOnline ? 'Đang hoạt động' : 'Hoạt động ' + getLastActiveTime() }}</div>
          </div>
        </div>
        <div class="header-actions">
          <button mat-icon-button matTooltip="Gọi thoại"><mat-icon>call</mat-icon></button>
          <button mat-icon-button matTooltip="Gọi video"><mat-icon>videocam</mat-icon></button>
          <button mat-icon-button matTooltip="Thông tin"><mat-icon>info</mat-icon></button>
        </div>
      </div>
      <div class="messenger-messages" #messagesContainer>
        <div *ngFor="let message of messages" class="message-row" [ngClass]="{'own': message.isOwn}">
          <div class="message-bubble" [ngClass]="{'own-bubble': message.isOwn, 'other-bubble': !message.isOwn}">
            <div class="message-content">{{ message.text }}</div>
            <div class="message-time">{{ message.time | date:'shortTime' }}</div>
          </div>
        </div>
      </div>
      <div class="messenger-input">
        <mat-form-field appearance="fill" class="input-field">
          <input matInput [(ngModel)]="newMessage" placeholder="Nhập tin nhắn..." (keyup.enter)="sendMessage()">
          <button mat-icon-button matSuffix (click)="sendMessage()" [disabled]="!newMessage.trim()">
            <mat-icon>send</mat-icon>
          </button>
        </mat-form-field>
      </div>
    </div>
  `,
  styles: [`
    .messenger-chat-container {
      display: flex;
      flex-direction: column;
      height: 100vh;
      background: #fff;
    }
    .messenger-header {
      flex: 0 0 72px;
      background: #fff;
      border-bottom: 1px solid #e4e4e4;
      display: flex;
      align-items: center;
      padding: 12px 20px;
      z-index: 2;
    }
    .user-info {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .avatar {
      width: 44px;
      height: 44px;
      border-radius: 50%;
      object-fit: cover;
    }
    .user-details {
      display: flex;
      flex-direction: column;
    }
    .user-name {
      font-weight: 600;
      font-size: 16px;
      color: #222;
    }
    .user-status {
      font-size: 13px;
      color: #4caf50;
    }
    .header-actions {
      display: flex;
      justify-content: right;
    }
    .header-actions button {
      margin-left: 8px;
      color: #65676b;
    }
    .messenger-messages {
      flex: 1 1 0;
      overflow-y: auto;
      padding: 24px 20px 16px 20px;
      background: #fff;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .message-row {
      display: flex;
      align-items: flex-end;
    }
    .message-row.own {
      justify-content: flex-end;
    }
    .message-bubble {
      max-width: 60%;
      padding: 10px 16px;
      border-radius: 18px;
      font-size: 15px;
      line-height: 1.5;
      box-shadow: 0 1px 2px rgba(0,0,0,0.04);
      margin-bottom: 2px;
      word-break: break-word;
      position: relative;
    }
    .own-bubble {
      background: #0084ff;
      color: #fff;
      border-bottom-right-radius: 6px;
    }
    .other-bubble {
      background: #f0f2f5;
      color: #222;
      border-bottom-left-radius: 6px;
    }
    .message-content {
      margin-bottom: 4px;
    }
    .message-time {
      font-size: 11px;
      color: #888;
      text-align: right;
    }
    .messenger-input {
      flex: 0 0 64px;
      background: #fff;
      border-top: 1px solid #e4e4e4;
      padding: 12px 20px 70px 20px;
      display: flex;
      align-items: center;
      z-index: 2;
    }
    .input-field {
      width: 100%;
      background: #f0f2f5;
      border-radius: 20px;
    }
    .input-field input {
      padding: 10px 16px;
      font-size: 15px;
      background: #f0f2f5;
      border-radius: 20px;
    }
  `]
})
export class ConversationComponent implements OnInit, OnDestroy {
  user: User | null = null;
  messages: Message[] = [];
  newMessage: string = '';
  private destroy$ = new Subject<void>();

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params
      .pipe(takeUntil(this.destroy$))
      .subscribe(params => {
        if (params['id']) {
          this.loadConversation(params['id']);
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadConversation(conversationId: string): void {
    // Mock data với nội dung khác nhau cho mỗi conversation
    const mockData: Record<string, { user: User, messages: Message[] }> = {
      '1': {
        user: {
          id: '1',
          name: 'Nguyễn Văn A',
          avatar: 'assets/images/default-avatar.png',
          isOnline: true,
          lastActive: new Date()
        },
        messages: [
          {
            id: '1',
            text: 'Chào bạn A!',
            time: new Date(Date.now() - 3600000),
            isOwn: false
          },
          {
            id: '2',
            text: 'Dự án của chúng ta thế nào rồi?',
            time: new Date(Date.now() - 3500000),
            isOwn: true,
            status: 'read'
          }
        ]
      },
      '2': {
        user: {
          id: '2',
          name: 'Trần Thị B',
          avatar: 'assets/images/default-avatar.png',
          isOnline: false,
          lastActive: new Date(Date.now() - 1800000)
        },
        messages: [
          {
            id: '1',
            text: 'Bạn có thể giúp mình một việc được không?',
            time: new Date(Date.now() - 7200000),
            isOwn: false
          },
          {
            id: '2',
            text: 'Được chứ, bạn cần gì?',
            time: new Date(Date.now() - 7000000),
            isOwn: true,
            status: 'read'
          },
          {
            id: '3',
            text: 'Mình cần bạn xem qua file tài liệu này',
            time: new Date(Date.now() - 6800000),
            isOwn: false
          }
        ]
      },
      '3': {
        user: {
          id: '3',
          name: 'Lê Văn C',
          avatar: 'assets/images/default-avatar.png',
          isOnline: true,
          lastActive: new Date()
        },
        messages: [
          {
            id: '1',
            text: 'Họp lúc mấy giờ vậy bạn?',
            time: new Date(Date.now() - 1800000),
            isOwn: false
          },
          {
            id: '2',
            text: '2h chiều nhé',
            time: new Date(Date.now() - 1700000),
            isOwn: true,
            status: 'read'
          },
          {
            id: '3',
            text: 'Ok, cảm ơn bạn',
            time: new Date(Date.now() - 1600000),
            isOwn: false
          }
        ]
      }
    };

    const conversationData = mockData[conversationId];
    if (conversationData) {
      this.user = conversationData.user;
      this.messages = conversationData.messages;
      setTimeout(() => this.scrollToBottom(), 100);
    } else {
      this.user = null;
      this.messages = [];
    }
  }

  sendMessage(): void {
    if (this.newMessage.trim()) {
      const newMsg: Message = {
        id: Date.now().toString(),
        text: this.newMessage,
        time: new Date(),
        isOwn: true,
        status: 'sent'
      };
      this.messages.push(newMsg);
      this.newMessage = '';
      setTimeout(() => this.scrollToBottom(), 0);
    }
  }

  scrollToBottom(): void {
    const container = document.querySelector('.messenger-messages');
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }

  getLastActiveTime(): string {
    if (!this.user?.lastActive) return '';
    const now = new Date();
    const diff = now.getTime() - this.user.lastActive.getTime();
    const minutes = Math.floor(diff / 60000);
    if (minutes < 60) return `${minutes} phút trước`;
    const hours = Math.floor(diff / 3600000);
    if (hours < 24) return `${hours} giờ trước`;
    const days = Math.floor(diff / 86400000);
    return `${days} ngày trước`;
  }
}

import { User } from './user.interface';

export interface Message {
  id: string;
  content: string;
  sender: User;
  receiver: User;
  isRead: boolean;
  createdAt: Date;
}

export interface Conversation {
  id: string;
  participants: User[];
  lastMessage: Message;
  unreadCount: number;
  updatedAt: Date;
}

export interface SendMessageRequest {
  content: string;
  receiverId: string;
} 
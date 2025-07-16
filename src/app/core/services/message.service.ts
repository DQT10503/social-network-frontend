import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Message, Conversation, SendMessageRequest } from '../models/message.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  constructor(private http: HttpClient) {}

  getConversations(page: number = 1, limit: number = 20): Observable<Conversation[]> {
    return this.http.get<Conversation[]>(`${environment.apiAuthUrl}/conversations`, {
      params: { page: page.toString(), limit: limit.toString() }
    });
  }

  getConversation(id: string): Observable<Conversation> {
    return this.http.get<Conversation>(`${environment.apiAuthUrl}/conversations/${id}`);
  }

  getMessages(conversationId: string, page: number = 1, limit: number = 50): Observable<Message[]> {
    return this.http.get<Message[]>(`${environment.apiAuthUrl}/conversations/${conversationId}/messages`, {
      params: { page: page.toString(), limit: limit.toString() }
    });
  }

  sendMessage(data: SendMessageRequest): Observable<Message> {
    return this.http.post<Message>(`${environment.apiAuthUrl}/messages`, data);
  }

  markAsRead(conversationId: string): Observable<void> {
    return this.http.put<void>(`${environment.apiAuthUrl}/conversations/${conversationId}/read`, {});
  }

  deleteConversation(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.apiAuthUrl}/conversations/${id}`);
  }

  deleteMessage(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.apiAuthUrl}/messages/${id}`);
  }
} 
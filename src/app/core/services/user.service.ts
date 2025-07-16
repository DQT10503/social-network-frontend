import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {}

  getProfile(): Observable<User> {
    return this.http.get<User>(`${environment.apiAuthUrl}/users/profile`);
  }

  updateProfile(data: Partial<User>): Observable<User> {
    return this.http.put<User>(`${environment.apiAuthUrl}/users/profile`, data);
  }

  updateAvatar(file: File): Observable<User> {
    const formData = new FormData();
    formData.append('avatar', file);
    return this.http.put<User>(`${environment.apiAuthUrl}/users/avatar`, formData);
  }

  getUser(id: string): Observable<User> {
    return this.http.get<User>(`${environment.apiAuthUrl}/users/${id}`);
  }

  searchUsers(query: string): Observable<User[]> {
    return this.http.get<User[]>(`${environment.apiAuthUrl}/users/search`, {
      params: { q: query }
    });
  }

  followUser(id: string): Observable<void> {
    return this.http.post<void>(`${environment.apiAuthUrl}/users/${id}/follow`, {});
  }

  unfollowUser(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.apiAuthUrl}/users/${id}/follow`);
  }

  getFollowers(id: string): Observable<User[]> {
    return this.http.get<User[]>(`${environment.apiAuthUrl}/users/${id}/followers`);
  }

  getFollowing(id: string): Observable<User[]> {
    return this.http.get<User[]>(`${environment.apiAuthUrl}/users/${id}/following`);
  }
} 
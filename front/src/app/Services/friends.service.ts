import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { userItem } from '../interfaces/user.interface';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FriendsService {
  constructor(private http: HttpClient) {}

  getMyFriends(): Observable<userItem[]> {
    // Пока заглушка, позже заменим на реальный GET запрос
    return of([
      {
        id: 1,
        nickname: 'Anna',
        email: 'anna@example.com',
        avatarUrl: '',
        isFriend: true,
        idVisitedEvents: []
      },
      {
        id: 2,
        nickname: 'Mike',
        email: 'mike@example.com',
        avatarUrl: '',
        isFriend: true,
        idVisitedEvents: [1, 3]
      }
    ]);
    
  }

  removeFriend(id: number): Observable<any> {
    return this.http.delete(`/api/friends/${id}`);
  }

  addFriend(id: number): Observable<any> {
    return this.http.post(`/api/friends`, { friendId: id });
  }
}

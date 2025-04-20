// search.service.ts
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { userItem } from '../interfaces/user.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private searchQuerySubject = new BehaviorSubject<string>('');
  searchQuery$ = this.searchQuerySubject.asObservable();
  http = inject(HttpClient)
  baseApiUrl = 'http://localhost:3000';
  setQuery(query: string) {
    this.searchQuerySubject.next(query);
  }
  
  getAllUsers(): Observable<userItem[]> {
    return of([
      {
        id: 1,
        email: 'test1@mail.com',
        nickname: 'User One',
        avatarUrl: '',
        idVisitedEvents: [],
        isFriend: false
      },
      {
        id: 2,
        email: 'test2@mail.com',
        nickname: 'User Two',
        avatarUrl: '',
        idVisitedEvents: [1, 2],
        isFriend: true
      }
    ]);
    
    // return this.http.get<userItem[]>(`${this.baseApiUrl}/api/moderate/users`);
    
  }

  // 🔎 Реализация фильтрации по имени или email (опционально)
  searchUsers(term: string): Observable<userItem[]> {
    return new Observable((observer) => {
      this.getAllUsers().subscribe((users) => {
        const filtered = users.filter(
          (user) =>
            user.nickname.toLowerCase().includes(term.toLowerCase()) ||
            user.email.toLowerCase().includes(term.toLowerCase())
        );
        observer.next(filtered);
        observer.complete();
      });
    });
  }
}

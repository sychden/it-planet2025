import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NewsItem } from '../interfaces/news.interface';
import { OrgItem } from '../interfaces/org.interface';
import { userItem } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class ModerateService {
 http = inject(HttpClient)
  baseApiUrl = 'http://localhost:3000'
  getNewsForModeration(): Observable<NewsItem[]> {
    return this.http.get<NewsItem[]>(`${this.baseApiUrl}/api/news/moderation`);
  }
  getOrgs(): Observable<OrgItem[]> {
        return this.http.get<OrgItem[]>(`${this.baseApiUrl}/api/org/verification`);
      }
  getUsers(): Observable<userItem[]> {
      return this.http.get<userItem[]>(`${this.baseApiUrl}/api/moderate/users`);
  }
  getNews(): Observable<NewsItem[]> {
    return this.http.get<NewsItem[]>(`${this.baseApiUrl}/api/news/moderation`);
  }
}

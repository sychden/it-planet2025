import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { NewsItem } from '../interfaces/news.interface';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  
  http = inject(HttpClient)
  apiUrl = 'http://localhost:3000/api/news';
  
  createNews(newsData: FormData): Observable<NewsItem> {
    return this.http.post<NewsItem>(this.apiUrl, newsData);
  }
}
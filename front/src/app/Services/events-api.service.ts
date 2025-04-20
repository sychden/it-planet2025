import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router'; // Добавляем Router
import { Observable, of } from 'rxjs';
import { delay, map, switchMap } from 'rxjs/operators';
import { EventItem } from '../interfaces/event.interface';
import { NewsItem } from '../interfaces/news.interface';

@Injectable({
  providedIn: 'root'
})
export default class EventsApiService {
  allEvents: EventItem[] = [];
  popularEvents: EventItem[] = []; // Добавляем кэш для популярных событий
  http = inject(HttpClient);
  router = inject(Router); // Инжектим Router
  baseApiUrl = 'http://localhost:3000'; 
  
    
  loadEvents(): void {
    this.getEvents().subscribe((data) => {
      this.allEvents = data;
       });   
  }
  getEvents(): Observable<EventItem[]> {
    return this.http.get<EventItem[]>(this.baseApiUrl + '/events');
  }

  getPopularEvents(): Observable<EventItem[]> {
    return this.http.get<EventItem[]>(this.baseApiUrl + '/popularEvents');
  }

  getEventsToModerate(): Observable<EventItem[]> {
    return this.getEvents();
  }

  getEventById(id: number): Observable<EventItem | undefined> {
    // Проверяем в allEvents
    if (this.allEvents.length > 0) {
      const event = this.allEvents.find(event => event.id === id);
      if (event) return of(event);
    }

    // Если не найдено в allEvents, проверяем popularEvents
    if (this.popularEvents.length > 0) {
      const popularEvent = this.popularEvents.find(event => event.id === id);
      if (popularEvent) return of(popularEvent);
    }

    // Если нигде нет, загружаем оба списка и проверяем
    return this.getEvents().pipe(
      switchMap(events => {
        this.allEvents = events;
        const event = events.find(e => e.id === id);
        if (event) return of(event);

        // Если не найдено в allEvents, проверяем popularEvents
        return this.getPopularEvents().pipe(
          map(popularEvents => {
            this.popularEvents = popularEvents;
            const popularEvent = popularEvents.find(e => e.id === id);
            
            if (!popularEvent) {
              this.router.navigate(['/404']); // Перенаправляем на 404
              return undefined;
            }

            return popularEvent;
          })
        );
      })
    );
  }
  getNews(): Observable<NewsItem[]> {
      return this.http.get<NewsItem[]>(`${this.baseApiUrl}/api/news/moderation`);
    }
  //здесь добавить получение через имя организации или профиля, хз как
  getAllEventsOfOrg(): Observable<EventItem[]> {
    return this.http.get<EventItem[]>(this.baseApiUrl + '/events');
  }
  createEvent(eventData: FormData): Observable<Event> {
    return this.http.post<Event>(this.baseApiUrl, eventData);
  }

  getCategories(): String[]{
    this.loadEvents()
    return Array.from(new Set(this.allEvents.map(e => e.category)));
  }
  
  getRegisteredEvents(): Observable<EventItem[]> {
    return this.http.get<EventItem[]>(this.baseApiUrl + '/events');
  }

  getTags(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseApiUrl}/tags`);
  }
}
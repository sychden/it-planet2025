import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import EventsApiService from '../../Services/events-api.service';
import { HeaderComponent } from '../../components/header/header.component';
import { MapComponent } from "../../components/map/map.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../Services/auth/auth.service';
import { EventItem } from '../../interfaces/event.interface';

@Component({
  selector: 'app-event-page',
  standalone: true,
  templateUrl: './event-page.component.html',
  styleUrls: ['./event-page.component.css'],
  imports: [HeaderComponent, MapComponent, FooterComponent, CommonModule]
})
export class EventPageComponent implements OnInit {
  eventId!: number;
  eventData!: EventItem;
  baseApiUrl = 'http://localhost:3000';

  // Инжектируем HttpClient и AuthService через конструктор
  constructor(
    private route: ActivatedRoute,
    private eventService: EventsApiService,
    private http: HttpClient,  // Инжекция через конструктор
    private authService: AuthService // Инжекция через конструктор
  ) {}

  ngOnInit(): void {
    this.eventId = Number(this.route.snapshot.paramMap.get('id'));

    this.eventService.getEventById(this.eventId).subscribe({
      next: (event) => {
        if (event) {
          this.eventData = event;
        } else {
          console.error('Мероприятие не найдено');
        }
      },
      error: (err) => {
        console.error('Ошибка при получении мероприятия:', err);
      }
    });
  }

  format() {
    return this.eventData?.date.split("-").reverse().join(".");
  }
  
  subscribeToEvent() {
    const token = this.authService.token; // Получаем токен через сервис
    const headers = { authorization: `Bearer ${token}` };
    this.http.post(`${this.baseApiUrl}/api/events/subscribe`, { eventId: this.eventId }, { headers })
      .subscribe({
        next: res => {
          console.log('Успешно записан', res);
          alert('Вы записаны на мероприятие!');
        },
        error: err => {
          console.error('Ошибка при записи', err);
          alert('Произошла ошибка при записи');
        }
      });
  }
}

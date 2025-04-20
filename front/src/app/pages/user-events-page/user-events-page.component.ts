import { Component, inject } from '@angular/core';
import { EventItem } from '../../interfaces/event.interface';
import { ProfileService } from '../../Services/profile.service';
import EventsApiService from '../../Services/events-api.service';
import { EventCardComponent } from "../../components/event-card/event-card.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-events-page',
  standalone: true,
  imports: [EventCardComponent, CommonModule],
  templateUrl: './user-events-page.component.html',
  styleUrl: './user-events-page.component.css'
})
export class UserEventsPageComponent {
  registeredEvents: EventItem[] = [];
  eventService = inject(EventsApiService)
  isLoading = true;
  profileService = inject(ProfileService)

  ngOnInit(): void {
    this.loadRegisteredEvents();
  }

  loadRegisteredEvents() {
    this.isLoading = true;
    this.eventService.getRegisteredEvents().subscribe((data) => {
      this.registeredEvents = data; 
    });
    this.isLoading = false;
  }

  unregisterFromEvent(eventId: number) {
    alert(`Вы откзалаись от мероприятия ${eventId}`)
    this.profileService.unregisterFromEvent(eventId).subscribe({
      next: () => {
        this.registeredEvents = this.registeredEvents.filter(e => e.id !== eventId);
      },
      error: (err) => {
        console.error('Не удалось отказаться от мероприятия', err);
      }
    });
  }
}

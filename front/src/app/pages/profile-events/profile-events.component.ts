import { Component, inject } from '@angular/core';
import EventsApiService from '../../Services/events-api.service';
import { EventItem } from '../../interfaces/event.interface';
import { EventCardModerateComponent } from "../../components/event-card-moderate/event-card-moderate.component";
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-profile-events',
  standalone: true,
  imports: [EventCardModerateComponent, CommonModule, RouterLink],
  templateUrl: './profile-events.component.html',
  styleUrl: './profile-events.component.css'
})
export class ProfileEventsComponent {
   events: EventItem[] = []
    eventService = inject(EventsApiService)
    ngOnInit(): void {
      this.loadEvents()
      
    }
    loadEvents(): void {
      this.eventService.getAllEventsOfOrg().subscribe((data) => {
        this.events = data; 
    });
    }
    
}


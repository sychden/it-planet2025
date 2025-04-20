import { Component, inject, OnInit } from '@angular/core';
import { EventCardModerateComponent } from "../../components/event-card-moderate/event-card-moderate.component";
import EventsApiService from '../../Services/events-api.service';
import { CommonModule } from '@angular/common';
import { EventItem } from '../../interfaces/event.interface';

@Component({
  selector: 'app-event-moderate',
  standalone: true,
  imports: [EventCardModerateComponent, CommonModule],
  templateUrl: './event-moderate.component.html',
  styleUrl: './event-moderate.component.css'
})
export class EventModerateComponent implements OnInit{
  events: EventItem[] = []
  eventService = inject(EventsApiService)
  ngOnInit(): void {
    this.loadEvents()
    
  }
  loadEvents(): void {
    this.eventService.getEvents().subscribe((data) => {
      this.events = data; 
  });
    
  }
}

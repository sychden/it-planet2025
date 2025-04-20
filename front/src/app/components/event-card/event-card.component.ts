import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { EventItem } from '../../interfaces/event.interface';

@Component({
  selector: 'app-event-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './event-card.component.html',
  styleUrl: './event-card.component.css'
})
export class EventCardComponent {
  @Input() event!: EventItem;
  @Input() showUnregisterButton = false;
  @Output() unregister = new EventEmitter<number>();

  router = inject(Router);

  navigate() {
    this.router.navigate(['/event', this.event.id]);
  }

  format(date: string) {
    return date.split("-").reverse().join(".");
  }

  onUnregisterClick() {
    this.unregister.emit(this.event.id);
  }
}

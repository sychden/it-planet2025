import { Component, inject, Input } from '@angular/core';
import { ModerateService } from '../../Services/moderate.service';
import { EventItem } from '../../interfaces/event.interface';

@Component({
  selector: 'app-event-card-moderate',
  standalone: true,
  imports: [],
  templateUrl: './event-card-moderate.component.html',
  styleUrl: './event-card-moderate.component.css'
})
export class EventCardModerateComponent {
  @Input() event!: EventItem;
  moderateService = inject(ModerateService)
  confirmEvent(id : number){
    alert(`Вы подтвердили мероприятие id ${id}`)
  }
  cancelEvent(id: number){
    alert(`Вы отклонили мероприятие под id ${id}`)
  }
}

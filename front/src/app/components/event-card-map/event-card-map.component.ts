import { CommonModule } from '@angular/common';
import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Component({
  selector: 'app-event-card-map',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './event-card-map.component.html',
  styleUrls: ['./event-card-map.component.css']
})
export class Event  {
  [x: string]: any;
  @Input() event: any;
  @Output() detailsClicked = new EventEmitter<void>();
  @Output() mouseEnter = new EventEmitter<void>();
  @Output() mouseLeave = new EventEmitter<void>();

  hovered = false;

  @HostListener('mouseenter')
  onMouseEnter() {
    this.mouseEnter.emit();
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.mouseLeave.emit();
  }

  onDetailsClick(event: MouseEvent) {
    event.stopPropagation();
    this.detailsClicked.emit();
  }
  
  format(date: string){
    return date.split("-").reverse().join(".")
  }
}

import { Component, Input } from '@angular/core';
import { OrgItem } from '../../interfaces/org.interface';

@Component({
  selector: 'app-org-card',
  standalone: true,
  imports: [],
  templateUrl: './org-card.component.html',
  styleUrl: './org-card.component.css'
})
export class OrgCardComponent {
@Input() org!: OrgItem
confirmOrg(id: number):void{
 alert(`Вы подтердили организацию с id ${id}`) 
}
cancelOrg(id: number):void{
  alert(`Вы подтердили организацию с id ${id}`) 
 }
}

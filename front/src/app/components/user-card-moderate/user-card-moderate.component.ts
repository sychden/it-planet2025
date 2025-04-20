import { Component, EventEmitter, Input, Output } from '@angular/core';
import { userItem } from '../../interfaces/user.interface';

@Component({
  selector: 'app-user-card-moderate',
  standalone: true,
  imports: [],
  templateUrl: './user-card-moderate.component.html',
  styleUrl: './user-card-moderate.component.css'
})
export class UserCardModerateComponent {
@Input() user!: userItem
@Input() role!: string
@Input() isFriendCard: boolean = false;
@Input() isFriend?: boolean = false;
 
  lockUser(id : number): void{
    alert(`Вы залочили пользователя ${id}`)
  }
  unlockUser(id : number): void{
    alert(`Вы разлочили пользователя ${id}`)
  }
  addFriend(id: number): void {
    alert(`Пользователь ${id} добавлен в друзья`);
  }
  
  removeFriend(id: number): void {
    alert(`Пользователь ${id} удалён из друзей`);
  }
  makeModerator(id : number): void{
    alert(`Вы назначили модератором пользователя ${id}`)
  }
  
  deleteModerator(id : number): void{
    alert(`Вы удалил модератора пользователя ${id}`)
  }
}

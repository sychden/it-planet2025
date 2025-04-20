import { Component, inject } from '@angular/core';
import { UserCardModerateComponent } from "../../components/user-card-moderate/user-card-moderate.component";
import { CommonModule } from '@angular/common';
import { userItem } from '../../interfaces/user.interface';
import { ModerateService } from '../../Services/moderate.service';
import { AuthService } from '../../Services/auth/auth.service';

@Component({
  selector: 'app-users-moderate',
  standalone: true,
  imports: [UserCardModerateComponent, CommonModule],
  templateUrl: './users-moderate.component.html',
  styleUrl: './users-moderate.component.css'
})
export class UsersModerateComponent {
  users: userItem[] = [{
    id: 1,
    email : 'example@normalize.com',
    nickname: 'amdin',
    idVisitedEvents: [1,2,3],
    avatarUrl: ''
}]
  role: string = ''
  authService = inject(AuthService)
  moderationService = inject(ModerateService)
  ngOnInit(): void {
    this.loadNews()
    this.role = this.authService.getRole()
    
  }
  loadNews(): void {
    this.moderationService.getUsers().subscribe((data) => {
      this.users = data; 
  });
}
}

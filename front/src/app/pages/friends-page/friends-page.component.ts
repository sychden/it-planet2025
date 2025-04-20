import { Component, inject } from '@angular/core';
import { FriendsService } from '../../Services/friends.service';
import { userItem } from '../../interfaces/user.interface';
import { UserCardModerateComponent } from "../../components/user-card-moderate/user-card-moderate.component";
import { SearchService } from '../../Services/search.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-friends-page',
  standalone: true,
  imports: [UserCardModerateComponent, ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './friends-page.component.html',
  styleUrl: './friends-page.component.css'
})
export class FriendsPageComponent {
  friends: userItem[] = [];
  allUsers: userItem[] = [];
  filteredUsers: userItem[] = [];
  searchTerm: string = '';
  
  friendsService = inject(FriendsService)
  searchService = inject(SearchService)

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): void {
    this.friendsService.getMyFriends().subscribe((friends) => {
      this.friends = friends;
      this.searchService.getAllUsers().subscribe((users) => {
        this.allUsers = users
          .filter((u) => u.id !== 999) // 👈 заменить на ID текущего пользователя
          .map((u) => ({
            ...u,
            isFriend: friends.some((f) => f.id === u.id),
          }));
        this.filteredUsers = [...this.allUsers];
      });
    });
  }

  onSearch(): void {
    const term = this.searchTerm.trim().toLowerCase();
    this.filteredUsers = this.allUsers.filter((user) =>
      user.nickname.toLowerCase().includes(term) ||
      user.email.toLowerCase().includes(term)
    );
  }

  addFriend(id: number): void {
    this.friendsService.addFriend(id).subscribe(() => {
      this.loadAll(); // перезагрузка списков
    });
  }

  removeFriend(id: number): void {
    this.friendsService.removeFriend(id).subscribe(() => {
      this.loadAll(); // перезагрузка списков
    });
  }
}

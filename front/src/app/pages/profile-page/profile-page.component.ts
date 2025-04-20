import { Component, inject, input } from '@angular/core';
import { Profile } from '../../interfaces/profile.interface';
import { ProfileService } from '../../Services/profile.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.css'
})
export class ProfilePageComponent {
  profile !: Profile
  
  constructor(private profileService: ProfileService) {}

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile(): void {
    this.profileService.getProfile().subscribe({
      next: (profile) => this.profile = profile,
      error: (err) => console.error('Failed to load profile', err)
    });
  }
}


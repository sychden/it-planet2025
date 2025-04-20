import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Profile } from '../interfaces/profile.interface';
import { userItem } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
    http = inject(HttpClient)
    apiUrl = 'http://localhost:3000/api/profile'
      
    getProfile(): Observable<Profile> {
      return this.http.get<Profile>(this.apiUrl);
    }
    getUserProfile(): Observable<userItem> {
      return this.http.get<userItem>(this.apiUrl);
    }
    unregisterFromEvent(eventId: number): Observable<any> {
      return this.http.post('/api/profile/unregister', { eventId });
    }
    updatePrivacySettings(settings: { showVisitedEvents: boolean }) {
      return this.http.patch('/api/user/privacy-settings', settings);
    }
    updateProfile(profileData: FormData): Observable<Profile> {
      return this.http.put<Profile>(this.apiUrl, profileData);
    }
  }

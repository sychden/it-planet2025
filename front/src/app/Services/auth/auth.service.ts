import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { TokenResponse } from './auth.interface';
import { tap } from 'rxjs';
import {CookieService} from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  http = inject(HttpClient) 
  cookService = inject(CookieService)
  userRole: string = '';
  router = inject(Router)
  baseApiUrl = 'http://localhost:3000' 
  token : string | null = null
  refresh_token : string | null = null
  get isAuth(){
    if(!this.token){
      this.token = this.cookService.get('token')
    }
    return !!this.token
  }
  login(payload:{email: string, password: string}){
    const fd = new FormData()
    fd.append('email', payload.email)
    fd.append('password', payload.password)

    alert(`Запрос отправлен
      Ваша почта: ${payload.email}
      Ваш пароль: ${payload.password}`)
    
      return this.http.post<TokenResponse>(`${this.baseApiUrl}/auth`, fd).pipe(
        tap(val =>{
          this.token = val.access_token
          this.refresh_token = val.refresh_token
          this.cookService.set('token', this.token)
          this.cookService.set('refresh_token', this.refresh_token)
        })
      )
  }
  
  setRole(role: string) {
    this.userRole = role;
  }

  getRole() {
    return 'user';
  }

  isUser() {
    return this.getRole() === 'user';
  }

  isModerator() {
    return this.getRole() === 'moderator';
  }

  isAdmin() {
    return this.getRole() === 'admin';
  }

  isOrg() {
    return this.getRole() === 'organization';
  }
  logout(): void {
    this.token = null;
    this.refresh_token = null; 
    this.cookService.delete('token');
    this.cookService.delete('refresh_token');
    this.router.navigate(['/login']);   
  }
  recoverPassword(payload:{email: string}){
    const fd = new FormData()
    fd.append('email', payload.email)

    alert(`Запрос отправлен
      Ваша почта: ${payload.email}`)
    return this.http.post(`${this.baseApiUrl}/recovery-password`, payload)
}
}
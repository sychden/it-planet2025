import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  http = inject(HttpClient);
  baseApiUrl = 'http://localhost:3000';

  registrationOfUser(payload: {email: string, name: string, password: string}): Observable<any> {
    return this.http.post(`${this.baseApiUrl}/register/user`, payload);
  }

  registrationOfOrganisation(formData: FormData): Observable<any> {
    return this.http.post(`${this.baseApiUrl}/register/organization`, formData);
  }
}
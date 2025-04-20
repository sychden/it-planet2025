import { Component, inject } from '@angular/core';
import { AuthService } from '../../Services/auth/auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-recover-password',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './recover-password.component.html',
  styleUrl: './recover-password.component.css'
})
export class RecoverPasswordComponent {
authService = inject(AuthService)
  router = inject(Router)
  form = new FormGroup({
    email: new FormControl(null, [Validators.email, Validators.required]),
  })
  onSubmit(event: Event){
    if(this.form.valid){
      console.log(this.form.value)
      //@ts-ignore
      this.authService.recoverPassword(this.form.value)
    }
  }
}

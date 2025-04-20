import { Component, inject } from '@angular/core';
import{FormGroup, FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import { AuthService } from '../../Services/auth/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  authService = inject(AuthService)
  router = inject(Router)
  form = new FormGroup({
    email: new FormControl(null, [Validators.email, Validators.required]),
    password: new FormControl(null, [Validators.required, Validators.minLength(5)])
  })
  onSubmit(event: Event){
    if(this.form.valid){
      console.log(this.form.value)
      //@ts-ignore
      this.authService.login(this.form.value).subscribe(res =>{
          this.router.navigateByUrl('')
          console.log(res)
        }
      );
    }
  }
}

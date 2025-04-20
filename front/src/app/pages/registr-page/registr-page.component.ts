import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { RegistrationService } from '../../Services/registration.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registr-page',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './registr-page.component.html',
  styleUrl: './registr-page.component.css'
})
export class RegistrPageComponent {
  isUser: boolean = true;
  isOrganisation: boolean = false;
  isLoading: boolean = false;
  errorMessage: string | null = null;
  successMessage: string | null = null;

  regService = inject(RegistrationService);

  userform = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    name: new FormControl('', Validators.required),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])
  });

  orgForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    nameOfOrg: new FormControl('', [Validators.required, Validators.minLength(3)]),
    confirmFile: new FormControl(null as File | null, Validators.required)
  });

  onSubmit(event: Event) {
    event.preventDefault();
    this.errorMessage = null;
    this.successMessage = null;

    if (this.isUser && this.userform.valid) {
      this.registerUser();
    } else if (this.isOrganisation && this.orgForm.valid) {
      this.registerOrganization();
    } else {
      this.markAllAsTouched();
    }
  }

  private registerUser() {
    this.isLoading = true;
    this.regService.registrationOfUser(this.userform.value as any).subscribe({
      next: () => {
        this.successMessage = 'Регистрация пользователя успешна!';
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Ошибка регистрации: ' + (error.error?.message || error.message);
        this.isLoading = false;
      }
    });
  }

  private registerOrganization() {
    if (!this.orgForm.value.confirmFile) {
      this.errorMessage = 'Пожалуйста, загрузите подтверждающий документ';
      return;
    }

    const formData = new FormData();
    formData.append('email', this.orgForm.value.email || '');
    formData.append('password', this.orgForm.value.password || '');
    formData.append('nameOfOrg', this.orgForm.value.nameOfOrg || '');
    formData.append('file', this.orgForm.value.confirmFile as File);

    this.isLoading = true;
    this.regService.registrationOfOrganisation(formData).subscribe({
      next: () => {
        this.successMessage = 'Регистрация организации успешна!';
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Ошибка регистрации: ' + (error.error?.message || error.message);
        this.isLoading = false;
      }
    });
  }

  private markAllAsTouched() {
    if (this.isUser) {
      Object.values(this.userform.controls).forEach(control => control.markAsTouched());
    } else {
      Object.values(this.orgForm.controls).forEach(control => control.markAsTouched());
    }
    this.errorMessage = 'Пожалуйста, заполните все обязательные поля правильно';
  }

  openOrganisationForm() {
    this.isUser = false;
    this.isOrganisation = true;
  }
  
  openUserForm() {
    this.isUser = true;
    this.isOrganisation = false;
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.orgForm.patchValue({ confirmFile: file });
    } else {
      this.orgForm.patchValue({ confirmFile: null });
    }
    this.orgForm.get('confirmFile')?.updateValueAndValidity();
  }
}
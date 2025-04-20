import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ProfileService } from '../../Services/profile.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-privacy-settings-page',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './privacy-settings-page.component.html',
  styleUrl: './privacy-settings-page.component.css'
})
export class PrivacySettingsPageComponent {
  privacyForm: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private profileService: ProfileService,
    private router: Router
  ) {
    this.privacyForm = this.fb.group({
      showVisitedEvents: [true] // по умолчанию видно
    });
  }

  ngOnInit(): void {
    this.profileService.getUserProfile().subscribe(profile => {
      this.privacyForm.patchValue({
        showVisitedEvents: profile.idVisitedEvents
      });
    });
  }

  onSubmit(): void {
    this.isLoading = true;

    const settings = {
      showVisitedEvents: this.privacyForm.get('showVisitedEvents')?.value
    };

    this.profileService.updatePrivacySettings(settings).subscribe({
      next: () => {
        this.router.navigate(['/profile']);
      },
      error: (err) => {
        console.error('Не удалось сохранить настройки', err);
        this.isLoading = false;
      }
    });
  }
}

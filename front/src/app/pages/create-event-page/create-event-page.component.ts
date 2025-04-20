import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Profile } from '../../interfaces/profile.interface';
import EventsApiService from '../../Services/events-api.service';
import { ProfileService } from '../../Services/profile.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-create-event-page',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './create-event-page.component.html',
  styleUrl: './create-event-page.component.css'
})
export class CreateEventPageComponent {
  eventForm: FormGroup;
  imagePreview: string | ArrayBuffer | null = null;
  categories: string[] = [];
  tags: string[] = [];
  selectedTags: string[] = [];
  organizerProfile: Profile | null = null;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private eventService: EventsApiService,
    private profileService: ProfileService,
    private router: Router
  ) {
    this.eventForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      image: [null, Validators.required],
      offline: [true, Validators.required],
      date: ['', [Validators.required]],
      category: ['', [Validators.required]],
      address: ['', []], // Обязательно только для офлайн мероприятий
      contacts: ['', [Validators.required]],
      tags: [[]]
    });
  }

  ngOnInit(): void {
    this.loadOrganizerProfile();
    this.eventService.getCategories();
    this.loadTags();

    this.eventForm.get('offline')?.valueChanges.subscribe(offline => {
      const addressControl = this.eventForm.get('address');
      if (offline) {
        addressControl?.setValidators([Validators.required]);
      } else {
        addressControl?.clearValidators();
      }
      addressControl?.updateValueAndValidity();
    });
  }

  loadOrganizerProfile(): void {
    this.profileService.getProfile().subscribe(profile => {
      this.organizerProfile = profile;
    });
  }

 

  loadTags(): void {
    this.eventService.getTags().subscribe(tags => {
      this.tags = tags;
    });
  }

  onImageChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.eventForm.patchValue({ image: file });
      this.eventForm.get('image')?.updateValueAndValidity();

      const reader = new FileReader();
      reader.onload = () => this.imagePreview = reader.result;
      reader.readAsDataURL(file);
    }
  }

  toggleTag(tag: string): void {
    const index = this.selectedTags.indexOf(tag);
    if (index === -1) {
      this.selectedTags.push(tag);
    } else {
      this.selectedTags.splice(index, 1);
    }
    this.eventForm.patchValue({ tags: this.selectedTags });
  }

  onSubmit(): void {
    if (this.eventForm.invalid || !this.organizerProfile) return;

    this.isLoading = true;
    const formData = new FormData();

    // Добавляем поля формы
    Object.keys(this.eventForm.controls).forEach(key => {
      const value = this.eventForm.get(key)?.value;
      if (value !== null && value !== undefined) {
        formData.append(key, value);
      }
    });

    // Добавляем организатора
    formData.append('organizerId', this.organizerProfile.id.toString());

    this.eventService.createEvent(formData).subscribe({
      next: () => {
        this.router.navigate(['/my-events']);
      },
      error: (err) => {
        console.error('Event creation failed', err);
        this.isLoading = false;
      }
    });
  }
}

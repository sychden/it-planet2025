import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NewsService } from '../../Services/news.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-news',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './create-news.component.html',
  styleUrl: './create-news.component.css'
})
export class CreateNewsComponent {
  newsForm: FormGroup;
  imagePreview: string | ArrayBuffer | null = null;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private newsService: NewsService,
    private router: Router
  ) {
    this.newsForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      text: ['', [Validators.required, Validators.minLength(10)]],
      image: [null, Validators.required],
      date: [new Date().toISOString().slice(0, 16), Validators.required]
    });
  }

  onImageChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.newsForm.patchValue({ image: file });
      this.newsForm.get('image')?.updateValueAndValidity();

      const reader = new FileReader();
      reader.onload = () => this.imagePreview = reader.result;
      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
    if (this.newsForm.invalid) return;

    this.isLoading = true;
    const formData = new FormData();
    
    formData.append('title', this.newsForm.get('title')?.value);
    formData.append('text', this.newsForm.get('text')?.value);
    formData.append('date', this.newsForm.get('date')?.value);
    formData.append('image', this.newsForm.get('image')?.value);

    this.newsService.createNews(formData).subscribe({
      next: () => {
        this.router.navigate(['/news']);
      },
      error: (err) => {
        console.error('News creation failed', err);
        this.isLoading = false;
      }
    });
  }
}

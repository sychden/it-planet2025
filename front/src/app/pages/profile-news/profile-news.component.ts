import { Component, inject } from '@angular/core';
import { NewsCardModerateComponent } from "../../components/news-card-moderate/news-card-moderate.component";
import { CommonModule } from '@angular/common';
import { ModerateService } from '../../Services/moderate.service';
import { NewsItem } from '../../interfaces/news.interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-profile-news',
  standalone: true,
  imports: [NewsCardModerateComponent, CommonModule, RouterLink],
  templateUrl: './profile-news.component.html',
  styleUrl: './profile-news.component.css'
})
export class ProfileNewsComponent {
  news: NewsItem[] = []
  moderationService = inject(ModerateService)
  ngOnInit(): void {
    this.loadNews()
    
  }
  loadNews(): void {
    this.moderationService.getNews().subscribe((data) => {
      this.news = data; 
  });
  }
}

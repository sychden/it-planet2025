import { Component, inject, Input } from '@angular/core';
import { NewsCardModerateComponent } from "../../components/news-card-moderate/news-card-moderate.component";
import { CommonModule } from '@angular/common';
import { NewsItem } from '../../interfaces/news.interface';
import { ModerateService } from '../../Services/moderate.service';

@Component({
  selector: 'app-news-moderate',
  standalone: true,
  imports: [NewsCardModerateComponent, CommonModule],
  templateUrl: './news-moderate.component.html',
  styleUrl: './news-moderate.component.css'
})
export class NewsModerateComponent {
  news: NewsItem[] = []
  moderationService = inject(ModerateService)
  ngOnInit(): void {
    this.loadNews()
    
  }
  loadNews(): void {
    this.moderationService.getNewsForModeration().subscribe((data) => {
      this.news = data; 
  });
    
  }
}

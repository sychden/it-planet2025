import { Component, Input } from '@angular/core';
import { NewsItem } from '../../interfaces/news.interface';

@Component({
  selector: 'app-news-card',
  standalone: true,
  imports: [],
  templateUrl: './news-card.component.html',
  styleUrl: './news-card.component.css'
})
export class NewsCardComponent {
@Input() news !: NewsItem
}

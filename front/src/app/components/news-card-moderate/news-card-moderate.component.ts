import { Component, Input } from '@angular/core';
import { NewsItem } from '../../interfaces/news.interface';

@Component({
  selector: 'app-news-card-moderate',
  standalone: true,
  imports: [],
  templateUrl: './news-card-moderate.component.html',
  styleUrl: './news-card-moderate.component.css'
})
export class NewsCardModerateComponent {
  @Input() news !: NewsItem
  confirmNews(id: number):void{
    alert(`Вы подтвердили новость id ${id}`)
  }
  cancelNews(id : number): void{
    alert(`Вы отклонили новость id ${id}`)
  }
}

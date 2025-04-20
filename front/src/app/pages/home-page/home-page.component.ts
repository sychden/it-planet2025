import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EventCardComponent } from "../../components/event-card/event-card.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { HeaderComponent } from "../../components/header/header.component";
import { MapComponent } from "../../components/map/map.component";
import EventsApiService from '../../Services/events-api.service';
import { EventItem } from '../../interfaces/event.interface';
import { NewsItem } from '../../interfaces/news.interface';
import { NewsCardComponent } from "../../components/news-card/news-card.component";
import { SearchService } from '../../Services/search.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    MapComponent,
    FormsModule,
    FooterComponent,
    EventCardComponent,
    NewsCardComponent
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent implements OnDestroy {
  selectedCity = '';
  allEvents: EventItem[] = [];
  filteredList: EventItem[] = [];
  news: NewsItem[] = [];
  poplarEvents: EventItem[] = [];
  categories: string[] = [];

  selectedCategory = '';
  selectedDate = '';
  selectedType = '';

  searchQuery = '';

  isMap: boolean = true;
  isList: boolean = false;

  private searchSubscription: Subscription;

  private eventService = inject(EventsApiService);
  private searchService = inject(SearchService);

  constructor() {
    this.searchSubscription = this.searchService.searchQuery$.subscribe(query => {
      this.searchQuery = query;
      this.applySearchFilter();
    });
  }

  ngOnInit(): void {
    this.loadEvents();
  }

  ngOnDestroy(): void {
    this.searchSubscription?.unsubscribe();
  }

  openMap() {
    this.isMap = true;
    this.isList = false;
  }

  openList() {
    this.isList = true;
    this.isMap = false;
  }

  loadEvents(): void {
    this.eventService.getEvents().subscribe((data) => {
      this.allEvents = data;
      this.filteredList = data;
      this.categories = Array.from(new Set(data.map(e => e.category)));
      this.applySearchFilter();
    });

    this.eventService.getPopularEvents().subscribe((data) => {
      this.poplarEvents = data;
    });

    this.eventService.getNews().subscribe((data) => {
      this.news = data;
    });
  }

  applySearchFilter(): void {
    const query = this.searchQuery.trim().toLowerCase();
    //Здесь надо будет вписать через api service запрос на бек а не поиск так
    this.filteredList = this.allEvents.filter(event =>
      event.title.toLowerCase().includes(query) ||
      event.description.toLowerCase().includes(query)
    );
  }

  filteredEvents(): EventItem[] {
    return this.filteredList.filter(event => {
      const matchCategory = !this.selectedCategory || event.category === this.selectedCategory;
      const matchDate = !this.selectedDate || event.date === this.selectedDate;
      const matchType =
        !this.selectedType ||
        (this.selectedType === 'live' && event.offline) ||
        (this.selectedType === 'online' && !event.offline);
      const matchCity = !this.selectedCity || (event.addres?.toLowerCase().includes(this.selectedCity.toLowerCase()) || event.addres?.toLowerCase().includes(this.selectedCity.toLowerCase()));
  
      return matchCategory && matchDate && matchType && matchCity;
    });
  }
}

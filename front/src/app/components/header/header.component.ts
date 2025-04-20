import { Component, inject } from '@angular/core';
import { SearchService } from '../../Services/search.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  searchText = '';
  searchService = inject(SearchService);

  onSearchChange() {
    this.searchService.setQuery(this.searchText);
  }
}


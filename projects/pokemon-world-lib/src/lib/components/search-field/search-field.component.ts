import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { SearchService } from '../../services/search.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'lib-search-field',
  imports: [MatIcon, CommonModule, FormsModule],
  templateUrl: './search-field.component.html',
  styleUrl: './search-field.component.scss',
})
export class SearchFieldComponent {
  private activatedRoute = inject(ActivatedRoute);
  searchValue = this.activatedRoute.snapshot.queryParams['search'] || '';

  constructor(private searchService: SearchService) {}

  onSearchChange(): void {
    this.searchService.setSearchTerm(this.searchValue);
  }
}

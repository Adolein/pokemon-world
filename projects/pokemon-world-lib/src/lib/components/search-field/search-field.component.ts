import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'lib-search-field',
  imports: [MatIcon, CommonModule, FormsModule],
  templateUrl: './search-field.component.html',
  styleUrl: './search-field.component.scss',
})
export class SearchFieldComponent implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);

  searchValue = '';

  onSearchChange() {
    console.log('Search Value:', this.searchValue);
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: { search: this.searchValue || null },
      queryParamsHandling: 'merge',
    });
  }

  onEnterPressed() {
    console.log('Search Value:', this.searchValue);
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: { search: this.searchValue || null },
      queryParamsHandling: 'merge',
    });
  }

  ngOnInit(): void {
    this.searchValue = this.activatedRoute.snapshot.queryParams['search'] || '';
  }
}

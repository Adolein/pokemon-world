import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private searchSubject = new Subject<string>();
  private router = inject(Router);

  public search$: Observable<string>;

  constructor() {
    this.search$ = this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged()
    );
  }

  setSearchTerm(searchTerm: string): void {
    this.router.navigate([], {
      queryParams: { search: searchTerm },
      queryParamsHandling: 'merge',
    });
    this.searchSubject.next(searchTerm);
  }

  getSearchTerm(): string {
    return this.router.routerState.snapshot.root.queryParams['search'] || '';
  }
}

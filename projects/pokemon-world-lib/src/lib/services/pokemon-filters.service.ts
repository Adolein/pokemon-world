import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, Observable, Subject } from 'rxjs';
import { PokemonType } from '../models/PokemonTypes';

@Injectable({
  providedIn: 'root',
})
export class pokemonFilterService {
  private filterSubject = new Subject<PokemonType>();
  private router = inject(Router);

  public filters$: Observable<PokemonType>;

  constructor() {
    this.filters$ = this.filterSubject.pipe(
      debounceTime(300),
      distinctUntilChanged()
    );
  }

  setFilters(filters: PokemonType): void {
    /* this.router.navigate([], {
      queryParams: { type: filters },
      queryParamsHandling: 'merge',
    }); */
    this.filterSubject.next(filters);
  }

  getFilters(): string {
    return this.router.routerState.snapshot.root.queryParams['type'] || '';
  }
}

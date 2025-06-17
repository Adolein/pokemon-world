import { Component, inject, OnInit } from '@angular/core';
import { PokemonWorldLibService } from '../../services/pokemon-world-lib.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { catchError, forkJoin, of, Subscription, switchMap } from 'rxjs';
import { PokemonCardComponent } from '../pokemon-card/pokemon-card.component';
import { SearchFieldComponent } from '../search-field/search-field.component';
import { PokemonQuery } from '../../models/pokemonQuery';
import { SearchService } from '../../services/search.service';
import { PokemonFiltersComponent } from '../pokemon-filters/pokemon-filters.component';
import { PokemonType } from '../../models/PokemonTypes';
import { pokemonFilterService } from '../../services/pokemon-filters.service';

@Component({
  selector: 'lib-pokemon-world-lib',
  imports: [
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    PokemonCardComponent,
    PokemonCardComponent,
    SearchFieldComponent,
    PokemonFiltersComponent,
  ],
  templateUrl: './pokemon-world-lib.component.html',
  styleUrl: './pokemon-world-lib.component.scss',
})
export class PokemonWorldLibComponent implements OnInit {
  pokemonService = inject(PokemonWorldLibService);
  searchService = inject(SearchService);
  filtersService = inject(pokemonFilterService);
  pokemonList: any = [];

  ngOnInit(): void {
    this.searchService.search$.subscribe((searchTerm) => {
      this.loadPokemonList({ search: searchTerm });
    });

    this.filtersService.filters$.subscribe((filters: PokemonType) => {
      console.log('Selected filter:', filters.url);

      this.loadPokemonList({
        type: filters.url || '',
      });
    });

    const searchValue = this.searchService.getSearchTerm() || '';
    this.loadPokemonList({ search: searchValue });
  }

  private loadPokemonList(queryParams: PokemonQuery) {
    this.pokemonList = [];
    this.pokemonService
      .getPokemonList(queryParams)
      .pipe(
        switchMap((pokemonList) => {
          const detailRequests = pokemonList.map((pokemon) =>
            this.pokemonService
              .getPokemonByUrl(pokemon.url)
              .pipe(catchError((_) => of({})))
          );
          return forkJoin(detailRequests);
        })
      )
      .subscribe((details) => {
        this.pokemonList = details;
        console.log('Pokemon-Details:', this.pokemonList);
      });
  }
}

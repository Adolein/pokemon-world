import { Component, inject, OnInit } from '@angular/core';
import { PokemonWorldLibService } from '../../services/pokemon-world-lib.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { catchError, forkJoin, of, Subscription, switchMap } from 'rxjs';
import { PokemonCardComponent } from '../pokemon-card/pokemon-card.component';
import { SearchFieldComponent } from '../search-field/search-field.component';
import { ActivatedRoute } from '@angular/router';
import { PokemonQuery } from '../../models/pokemonQuery';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'lib-pokemon-world-lib',
  imports: [
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    PokemonCardComponent,
    PokemonCardComponent,
    SearchFieldComponent,
  ],
  templateUrl: './pokemon-world-lib.component.html',
  styleUrl: './pokemon-world-lib.component.scss',
})
export class PokemonWorldLibComponent implements OnInit {
  pokemonService = inject(PokemonWorldLibService);
  pokemonList: any = [];
  searchValue = '';

  private searchSub!: Subscription;

  constructor(private searchService: SearchService) {}

  ngOnInit(): void {
    this.searchSub = this.searchService.search$.subscribe((searchTerm) => {
      console.log('searching:', searchTerm);
      this.loadPokemonList({ search: searchTerm });
    });
    this.loadPokemonList({});
  }

  ngOnDestroy(): void {
    this.searchSub.unsubscribe(); // Cleanup
  }

  private loadPokemonList(queryParams: PokemonQuery) {
    this.pokemonList = [];
    this.pokemonService
      .getPokemonList({ search: queryParams.search || '' })
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

import { Component, inject, OnInit } from '@angular/core';
import { PokemonWorldLibService } from '../../services/pokemon-world-lib.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import {
  concatMap,
  forkJoin,
  map,
  mergeMap,
  switchMap,
  tap,
  timer,
  toArray,
} from 'rxjs';
import { JsonPipe } from '@angular/common';
import { PokemonCardComponent } from '../pokemon-card/pokemon-card.component';

@Component({
  selector: 'lib-pokemon-world-lib',
  imports: [
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    PokemonCardComponent,
    PokemonCardComponent,
  ],
  templateUrl: './pokemon-world-lib.component.html',
  styleUrl: './pokemon-world-lib.component.scss',
})
export class PokemonWorldLibComponent implements OnInit {
  pokemonService = inject(PokemonWorldLibService);
  pokemonList: any = [];

  ngOnInit(): void {
    this.pokemonService
      .getPokemonList()
      .pipe(
        switchMap((pokemonList) => {
          const detailRequests = pokemonList.map((pokemon) =>
            this.pokemonService.getPokemonByUrl(pokemon.url)
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

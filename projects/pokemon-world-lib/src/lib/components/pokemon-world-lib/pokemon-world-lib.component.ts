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
    JsonPipe,
    PokemonCardComponent,
    PokemonCardComponent,
  ],
  templateUrl: './pokemon-world-lib.component.html',
  styleUrl: './pokemon-world-lib.component.scss',
})
export class PokemonWorldLibComponent implements OnInit {
  pokemonService = inject(PokemonWorldLibService);
  pokemonList: any = [];

  /* ngOnInit(): void {
    this.pokemonList = this.pokemonService
      .getPokemonList()
      .subscribe((pokemon: any) => (this.pokemonList = pokemon));
  } */
  /* ngOnInit(): void {
    this.pokemonService
      .getPokemonList()
      .pipe(
        //tap((pokemon: any) => console.log('Pokemon List:', pokemon)),
        map((p: any) =>
          p.map((t: any) => this.pokemonService.getPokemonByUrl(t.url))
        )
      )
      .subscribe((p) => {
        this.pokemonList.push(p);
      });
  } */

  ngOnInit(): void {
    this.pokemonService
      .getPokemonList()
      .pipe(
        switchMap((pokemonList) => {
          // Erstelle ein Array von Observables für jede URL
          const detailRequests = pokemonList.map((pokemon) =>
            this.pokemonService.getPokemonByUrl(pokemon.url)
          );

          // Führe alle Requests parallel aus
          return forkJoin(detailRequests);
        })
      )
      .subscribe((details) => {
        this.pokemonList = details; // Array mit allen Details
        console.log('Alle Pokémon-Details:', this.pokemonList);
      });
  }
}

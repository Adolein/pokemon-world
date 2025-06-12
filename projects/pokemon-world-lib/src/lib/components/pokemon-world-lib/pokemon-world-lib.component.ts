import { Component, inject, OnInit } from '@angular/core';
import { TestComponent } from '../test/test.component';
import { PokemonWorldLibService } from '../../services/pokemon-world-lib.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { tap } from 'rxjs';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'lib-pokemon-world-lib',
  imports: [
    TestComponent,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    JsonPipe,
  ],
  templateUrl: './pokemon-world-lib.component.html',
  styleUrl: './pokemon-world-lib.component.scss',
})
export class PokemonWorldLibComponent implements OnInit {
  pokemonService = inject(PokemonWorldLibService);
  pokemonList: any = [];

  ngOnInit(): void {
    this.pokemonList = this.pokemonService
      .getPokemonList()
      .subscribe((pokemon: any) => (this.pokemonList = pokemon));
  }
}

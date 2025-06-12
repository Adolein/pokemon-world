import { Component, inject, OnInit } from '@angular/core';
import { TestComponent } from '../test/test.component';
import { PokemonWorldLibService } from '../../services/pokemon-world-lib.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'lib-pokemon-world-lib',
  imports: [TestComponent, MatButtonModule, MatIconModule],
  templateUrl: './pokemon-world-lib.component.html',
  styleUrl: './pokemon-world-lib.component.scss',
})
export class PokemonWorldLibComponent implements OnInit {
  pokemonService = inject(PokemonWorldLibService);
  pokemonList: any = [];

  ngOnInit(): void {
    this.pokemonService
      .getPokemonList()
      .subscribe((pokemon) => (this.pokemonList = pokemon));
    console.log('Pokemon List:', this.pokemonList);
  }
}

import { Component, inject, Input, input, OnInit } from '@angular/core';
import { PokemonWorldLibService } from '../../services/pokemon-world-lib.service';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'lib-pokemon-detail',
  imports: [JsonPipe],
  templateUrl: './pokemon-detail.component.html',
  styleUrl: './pokemon-detail.component.scss',
})
export class PokemonDetailComponent implements OnInit {
  @Input() pokemon: any;
  pokemonService = inject(PokemonWorldLibService);

  pokemonDetails: any = [];

  ngOnInit(): void {
    this.pokemonDetails = this.pokemonService
      .getPokemonList()
      .subscribe((pokemon: any) => (this.pokemonDetails = pokemon));
  }
}

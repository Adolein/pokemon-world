import { Component, inject, Input, input, OnInit } from '@angular/core';
import { PokemonWorldLibService } from '../../services/pokemon-world-lib.service';
import { JsonPipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'lib-pokemon-detail',
  imports: [MatCardModule],
  templateUrl: './pokemon-detail.component.html',
  styleUrl: './pokemon-detail.component.scss',
})
export class PokemonDetailComponent implements OnInit {
  pokemonService = inject(PokemonWorldLibService);

  pokemonDetails: any = {};

  private activatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    console.log('Pokemon ID:', this.activatedRoute.snapshot.params['id']);

    this.pokemonDetails = this.pokemonService
      .getPokemonById(this.activatedRoute.snapshot.params['id'])
      .subscribe((pokemon: any) => (this.pokemonDetails = pokemon));
  }
}

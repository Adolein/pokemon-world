import { Component, inject } from '@angular/core';
import { POKEMON_TYPES, PokemonType } from '../../models/PokemonTypes';
import { MatIcon } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { pokemonFilterService } from '../../services/pokemon-filters.service';
@Component({
  selector: 'lib-pokemon-filters',
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
  ],
  templateUrl: './pokemon-filters.component.html',
  styleUrl: './pokemon-filters.component.scss',
})
export class PokemonFiltersComponent {
  pokemonTypes = POKEMON_TYPES;
  selectedType = new FormControl('');
  filterservice = inject(pokemonFilterService);

  onTypeChange(type: PokemonType): void {
    console.log('Selected type:', type);
    this.filterservice.setFilters(type);
  }
}

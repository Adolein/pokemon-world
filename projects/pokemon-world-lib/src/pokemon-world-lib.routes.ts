import { Routes } from '@angular/router';
import { PokemonWorldLibComponent } from './lib/components/pokemon-world-lib/pokemon-world-lib.component';
import { PokemonDetailComponent } from './lib/components/pokemon-detail/pokemon-detail.component';

export const POKEMON_WORLD_LIB_ROUTES: Routes = [
  { path: '', component: PokemonWorldLibComponent },
  { path: 'pokemon/:name/:id', component: PokemonDetailComponent },
];

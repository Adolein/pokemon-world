import { Routes } from '@angular/router';
import { TestComponent } from './lib/components/test/test.component';
import { PokemonWorldLibComponent } from './lib/components/pokemon-world-lib/pokemon-world-lib.component';

export const POKEMON_WORLD_LIB_ROUTES: Routes = [
  { path: '', component: PokemonWorldLibComponent },
  { path: 'test', component: TestComponent },
];

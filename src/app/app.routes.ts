import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('@pokemon-world-lib').then((m) => m.POKEMON_WORLD_LIB_ROUTES),
  },
  { path: '**', redirectTo: '' },
];

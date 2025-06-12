import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PokemonWorldLibService {
  PokemonAPIUrl = 'https://pokeapi.co/api/v2/pokemon?limit=100&offset=0';
  private httpCient = inject(HttpClient);

  getPokemonList() {
    return this.httpCient.get(this.PokemonAPIUrl).pipe(
      map((response: any) => {
        return response.results.map((pokemon: any) => ({ ...pokemon }));
      })
    );
  }
}

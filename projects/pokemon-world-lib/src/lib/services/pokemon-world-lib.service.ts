import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { filter, forkJoin, map, Observable, switchMap, tap } from 'rxjs';
import { PokemonList } from '../models/pokemonList';
import { PokemonListResponse } from '../models/pokemonListResponse';
import { PokemonQuery } from '../models/pokemonQuery';

@Injectable({
  providedIn: 'root',
})
export class PokemonWorldLibService {
  PokemonAPIUrl = 'https://pokeapi.co/api/v2/pokemon';
  private httpClient = inject(HttpClient);

  getPokemonList(queryParams: PokemonQuery): Observable<PokemonList[]> {
    const pokemonlisturl = this.PokemonAPIUrl + '?limit=100&offset=0';

    return this.httpClient
      .get<PokemonListResponse<PokemonList>>(pokemonlisturl)
      .pipe(
        map((respone) =>
          respone.results.filter((pokemon: PokemonList) =>
            queryParams.search
              ? pokemon.name.includes(queryParams.search || '')
                ? ({ ...pokemon } as PokemonList)
                : null
              : ({ ...pokemon } as PokemonList)
          )
        )
      );
  }

  getPokemonById(id: number): Observable<PokemonList> {
    const pokemonlisturl = this.PokemonAPIUrl + '/' + id;
    return this.httpClient
      .get<any>(pokemonlisturl)
      .pipe(tap((response) => console.log('res', response)));
  }
  getPokemonByUrl(url: string): Observable<PokemonList> {
    return this.httpClient.get<any>(url);
  }
}

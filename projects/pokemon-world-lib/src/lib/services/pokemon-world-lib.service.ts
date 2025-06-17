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
    let pokemonlisturl = this.PokemonAPIUrl + '?limit=100&offset=0';
    console.log('queryParams', queryParams);

    if (queryParams.type) {
      pokemonlisturl = queryParams.type;
    }
    console.log('pokemonlisturl', pokemonlisturl);

    return this.httpClient
      .get<PokemonListResponse<PokemonList>>(pokemonlisturl)
      .pipe(
        map((respone) => {
          if (queryParams.type) return this.getTypeFilterdPokemonList(respone);
          else
            return this.getsearchPokemonList(respone, queryParams.search || '');
        })
      );
  }

  private getsearchPokemonList(respone: any, search: string) {
    return respone.results.filter((pokemon: PokemonList) =>
      search
        ? pokemon.name
            .toLocaleLowerCase()
            .includes(search.toLocaleLowerCase() || '')
          ? ({ ...pokemon } as PokemonList)
          : null
        : ({ ...pokemon } as PokemonList)
    );
  }

  private getTypeFilterdPokemonList(respone: any) {
    console.log('respone', respone.pokemon);

    return respone.pokemon.map(
      (item: any) => ({ ...item.pokemon } as PokemonList)
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

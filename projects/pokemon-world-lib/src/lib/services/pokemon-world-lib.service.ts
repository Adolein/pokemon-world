import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { forkJoin, map, Observable, switchMap, tap } from 'rxjs';
import { PokemonList } from '../models/pokemonList';
import { PokemonListResponse } from '../models/pokemonListResponse';

@Injectable({
  providedIn: 'root',
})
export class PokemonWorldLibService {
  PokemonAPIUrl = 'https://pokeapi.co/api/v2/pokemon';
  private httpClient = inject(HttpClient);

  getPokemonList(): Observable<PokemonList[]> {
    const pokemonlisturl = this.PokemonAPIUrl + '?limit=100&offset=0';
    /* console.log(
      this.getPokemonByUrl(this.PokemonAPIUrl + '/' + 1).subscribe((d) =>
        console.log('getPokemonByUrl', d)
      )
    ); */

    return this.httpClient
      .get<PokemonListResponse<PokemonList>>(pokemonlisturl)
      .pipe(
        //tap((response) => console.log(response)),
        map((respone) =>
          respone.results.map(
            (pokemon: PokemonList) => ({ ...pokemon } as PokemonList)
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

  /* getPokemon(id: number): Observable<PokemonList> {
    const pokemonlisturl = this.PokemonAPIUrl + '/' + id;
    return this.httpCient
      .get<PokemonList>(pokemonlisturl)
      .pipe(
        map((respone) =>
          respone.map(
            (pokemon: PokemonList) => ({ ...pokemon } as PokemonList)
          )
        )
      );
  } */

  /* getPokemonList(): any {
    return this.httpCient.get<any>(this.PokemonAPIUrl).pipe(
      map((response: any) =>
        response.results.map((pokemon: any) => ({ ...pokemon }))
      ),
      switchMap((pokemons: any) => {
        const pokemonDetailsRequests = pokemons.map((p: PokemonList) =>
          this.httpCient.get<PokemonList>(p.url).pipe(
            map((details: any) => ({
              name: details.name,
              url: details.url,
              id: details.id,
              height: details.height,
              weight: details.weight,
              types: details.types.map((type: any) => type.type.name),
            }))
          )
        );
        return forkJoin(pokemonDetailsRequests);
      })
      //tap((pokemon) => console.log('Fetched Pokemon:', pokemon))
    );
  }

  getPokemonById(id: Number): any {
    return this.httpCient.get<any>('https://pokeapi.co/api/v2/pokemon/1').pipe(
      map((response: any) =>
        response.results.map((pokemon: any) => ({ ...pokemon }))
      ),
      switchMap((pokemons: any) => {
        const pokemonDetailsRequests = pokemons.map((p: PokemonList) =>
          this.httpCient.get<PokemonList>(p.url).pipe(
            map((details: any) => ({
              name: details.name,
              url: details.url,
              id: details.id,
              height: details.height,
              weight: details.weight,
              types: details.types.map((type: any) => type.type.name),
            }))
          )
        );
        return forkJoin(pokemonDetailsRequests);
      })
      //tap((pokemon) => console.log('Fetched Pokemon:', pokemon))
    );
  } */
}

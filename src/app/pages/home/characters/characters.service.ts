import { Character } from './character';
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable, of } from "rxjs";
import { catchError, map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class CharactersService {

  constructor(private http: HttpClient) {
  }


  /** GET characters from the server and filter out characters that have no name */
  getCharacters(): Observable<Character[]> {
    return this.http.get<Character[]>('https://www.anapioficeandfire.com/api/characters?page=1&pageSize=1000')
      .pipe(
        map(characters => characters.filter(character => character.name.length > 0)),
        catchError(this.handleError<Character[]>('getCharacters', []))
      )
  }


  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);

      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}

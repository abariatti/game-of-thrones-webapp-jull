import { Book } from './book';
import { Injectable } from '@angular/core';
import { HttpClient, } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { catchError, map, tap } from 'rxjs/operators';
import { extractPageNumberFromHeader } from 'src/app/shared/helpers/extract-page-numbers-from-header';


@Injectable({
  providedIn: 'root'
})
export class BooksService {

  _currentPageNumber = 1;
  _pageSize = 50; // max size stated on https://anapioficeandfire.com/Documentation

  constructor(private http: HttpClient) { }

  get currentPageNumber() {
    return this._currentPageNumber;
  }

  get pageSize() {
    return this._pageSize;
  }


  /** GET books from the server and filter out books that have no name */
  getBooks(): Observable<Book[]> {
    return this.http.get<any>(`https://www.anapioficeandfire.com/api/books?page=${this._currentPageNumber}&pageSize=${this._pageSize}`, { observe: 'response' })
      .pipe(
        tap(val => {
          this._pageSize = extractPageNumberFromHeader(val.headers.get("link"));
          this._currentPageNumber++;
        }),
        map(response => response.body.filter((book: { name: string | any[]; }) => book.name.length > 0)),
        catchError(this.handleError<Book[]>('getBooks', [])),
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

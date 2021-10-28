import { BookFilter, Book } from './../../pages/home/books/book';
import { HouseFilter, House } from './../../pages/home/houses/house';
import { Character, CharacterFilter } from './../../pages/home/characters/character';
import { Injectable } from '@angular/core';
import { HttpClient, } from "@angular/common/http";
import { Observable, of, forkJoin } from "rxjs";
import { catchError, map, tap, take } from 'rxjs/operators';
import { extractPageNumberFromHeader } from '../helpers/extract-page-numbers-from-header';
import { formatDate } from '../helpers/format-date';

type Filter = CharacterFilter & BookFilter & HouseFilter;

@Injectable({
  providedIn: 'root'
})
export class ResourcesService {

  _currentPageNumber = 1;
  _pageSize = 50; // max size 50 stated on https://anapioficeandfire.com/Documentation
  _url = "https://www.anapioficeandfire.com/api/";
  _numberOfPages: number = 10;

  constructor(private http: HttpClient) {
  }

  get currentPageNumber() {
    return this._currentPageNumber;
  }

  get pageSize() {
    return this._pageSize;
  }

  get numberOfPages() {
    return this._numberOfPages;
  }

  // this is useful when filter or search input changes -> next api call will start at page 1
  resetCurrentPageNumber() {
    this._currentPageNumber = 1;
  }

  // GET Resource from server and filter out those that have no name 
  getResources(filter: Filter, searchTerm: string, resource: "characters" | "books" | "houses"): Observable<any> {
    // construct string of all params from given filters and search term
    let params = "";

    switch (resource) {
      case "characters":
        if (filter.status === "isAlive") params += "isAlive=true&";
        else if (filter.status === "isDead") params += "isAlive=false&";
        if (filter.gender === "female") params += "gender=female&";
        else if (filter.gender === "male") params += "gender=male&";
        break;
      case "houses":
        if (filter.hasWords) params += "hasWords=true&";
        if (filter.hasTitles) params += "hasTitles=true&";
        if (filter.hasSeats) params += "hasSeats=true&";
        if (filter.hasDiedOut) params += "hasDiedOut=true&";
        if (filter.hasAncestralWeapons) params += "hasAncestralWeapons=true&";
        break;
      case "books":
        // transform date to YYYY-MM-DDT00:00:00
        if (filter.fromReleaseDate) params += "fromReleaseDate=" + formatDate(filter.fromReleaseDate) + "&";
        if (filter.toReleaseDate) params += "toReleaseDate=" + formatDate(filter.toReleaseDate) + "&";
        break;
      default:
        break;
    }

    if (searchTerm === "") {
      return this.http.get<any>(`${this._url}${resource}?${params}page=${this._currentPageNumber}&pageSize=${this._pageSize}`, { observe: 'response' })
        .pipe(
          take(1),
          tap(val => {
            let calculatedNumberOfPages = extractPageNumberFromHeader(val.headers.get("link"));
            if (calculatedNumberOfPages) this._numberOfPages = calculatedNumberOfPages;
            this._currentPageNumber++;
          }),
          map(response => response.body.filter((item: { name: string | any[]; }) => item.name.length > 0)),
          catchError(this.handleError<any>('getResources', [])),
        )
    } else {
      // if user uses search input field, results should be searched for all possible fields
      // filters should still be considered in this case
      let calls = [];
      switch (resource) {
        case "characters":
          for (let key of ["name", "culture"]) {
            calls.push(this.http.get<any>(`${this._url}${resource}?${key}=${searchTerm}&${params}page=${this._currentPageNumber}&pageSize=${this._pageSize}`, { observe: 'response' }));
          }
          break;
        case "houses":
          for (let key of ["name", "region", "words"]) {
            calls.push(this.http.get<any>(`${this._url}${resource}?${key}=${searchTerm}&${params}page=${this._currentPageNumber}&pageSize=${this._pageSize}`, { observe: 'response' }));
          }
          break;
        case "books":
          calls.push(this.http.get<any>(`${this._url}${resource}?name=${searchTerm}&${params}page=${this._currentPageNumber}&pageSize=${this._pageSize}`, { observe: 'response' }));
          break;
        default:
          break;
      }
      return forkJoin(calls)
        .pipe(
          take(1),
          tap(values => {
            let pageNumbers = 1;
            values.forEach(val => {
              let calculatedPageNumbers = extractPageNumberFromHeader(val.headers.get("link"))
              if (calculatedPageNumbers && calculatedPageNumbers > pageNumbers) this._numberOfPages = calculatedPageNumbers;
            })
            this._currentPageNumber++;
          }),
          map(response => {
            let res: any[] = response.map(httpResponse => [...httpResponse.body])
            let merged = [].concat.apply([], res);
            return merged;

          }),
          catchError(this.handleError<any>('getResources', [])),
        )
    }
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

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  // fetch name for a specific book, character or house
  fetchNameFromUrl(url: string): Observable<string> {
    return this.http.get<Character | Book | House>(url).pipe(
      map(response => response.name)
    )
  }

  // fetch names for an array of specific books, characters or houses
  fetchNamesFromUrls(urls: string[]): Observable<string[]> {
    let calls: Observable<any>[] = [];
    urls.forEach(url => {
      calls.push(this.http.get<any>(url));
    });
    return forkJoin(calls).pipe(
      map(response => {
        let res = response.map(r => r.name)
        return res;
      }),
    )
  }

  fetchResourceById(id: string, resource: string): Observable<Character & House & Book> {
    return this.http.get<Character & House & Book>(`${this._url}${resource}/${id}`);
  }


}

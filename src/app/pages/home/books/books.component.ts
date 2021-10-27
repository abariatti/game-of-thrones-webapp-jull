import { Router } from '@angular/router';
import { ResourcesService } from './../../../shared/services/resources.service';
import { Component, OnInit } from '@angular/core';
import { Book, BookFilter } from './book';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { extractIdFromUrl } from './../../../shared/helpers/extract-id';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {

  books: Book[] = [];
  pageSize = 10;
  loading = true;
  searchInput = "";
  filter: BookFilter = {
  }
  modelChanged: Subject<string> = new Subject<string>();
  datepickerFrom: any;
  datepickerTo: any;

  constructor(private resourcesService: ResourcesService, private router: Router) {
    // include debouncing for search input field to limit api requests
    this.modelChanged.pipe(
      debounceTime(500),
      distinctUntilChanged())
      .subscribe(model => {
        this.searchInput = model;
        this.onSearchChange(model);
      });
  }

  ngOnInit(): void {
    this.resourcesService.resetCurrentPageNumber();
    this.getResources();
  }

  // fetch books data from api
  getResources(): void {
    this.resourcesService.getResources(this.filter, this.searchInput, "books")
      .subscribe(books => {
        this.books = books;
        this.loading = false;
      });
  }

  filterBooks(date: Date, type: string) {
    if (type === "from") {
      this.filter = { ...this.filter, fromReleaseDate: date }
    } else if (type === "to") {
      this.filter = { ...this.filter, toReleaseDate: date }
    }
    this.resourcesService.resetCurrentPageNumber();
    this.getResources();
  }


  onSearchChange(term: string) {
    this.resourcesService.resetCurrentPageNumber();
    this.resourcesService.getResources(this.filter, term, "books").subscribe(books => this.books = books)
  }

  extractIdFromUrl(url: string): string {
    return extractIdFromUrl(url);
  }

  onRoute(resource: string): void {
    this.router.navigate(["/home/" + resource]);
  }

}

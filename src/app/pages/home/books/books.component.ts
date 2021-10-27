import { ResourcesService } from './../../../shared/services/resources.service';
import { BookDetailsComponent } from './book-details/book-details.component';
import { Component, OnInit } from '@angular/core';
import { Book, BookFilter } from './book';
import { NbDialogService } from '@nebular/theme';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';


@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {

  books: Book[] = [];
  pageSize = 10;
  loading = false;
  searchInput = "";
  filter: BookFilter = {
  }
  modelChanged: Subject<string> = new Subject<string>();
  datepickerFrom: any;
  datepickerTo: any;

  constructor(private resourcesService: ResourcesService, private dialogService: NbDialogService) {
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
      .subscribe(books => this.books = books);
  }

  // fetch more books from api once user scrolled to end of book list
  loadMoreData(): void {
    /*  if (this.resourcesService.currentPageNumber <= this.resourcesService.pageSize) {
       this.resourcesService.getResources().subscribe(books => this.books = [...this.books, ...books])
     } */
  }

  // method to open dialog window with book details
  openDialog(book: Book) {
    this.dialogService.open(BookDetailsComponent, {
      context: {

      },
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

}

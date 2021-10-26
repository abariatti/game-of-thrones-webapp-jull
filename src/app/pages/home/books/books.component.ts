import { BookDetailsComponent } from './book-details/book-details.component';
import { Component, OnInit, Input } from '@angular/core';
import { Book } from './book';
import { NbDialogService } from '@nebular/theme';
import { BooksService } from './books.service';


@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {

  books: Book[] = [];
  placeholders = [];
  pageSize = 10;
  pageToLoadNext = 1;
  loading = false;
  @Input() searchInput = "";

  constructor(private booksService: BooksService, private dialogService: NbDialogService) { }

  ngOnInit(): void {
    this.getBooks();
    console.log("init");

  }

  // fetch characters data from api
  getBooks(): void {
    this.booksService.getBooks()
      .subscribe(books => this.books = books);
  }

  // fetch more characters from api once user scrolled to end of character list
  loadMoreData(): void {
    if (this.booksService.currentPageNumber <= this.booksService.pageSize) {
      this.booksService.getBooks().subscribe(books => this.books = [...this.books, ...books])
    }
  }

  // method to open dialog window with character details
  openDialog(book: Book) {
    this.dialogService.open(BookDetailsComponent, {
      context: {

      },
    });
  }

}

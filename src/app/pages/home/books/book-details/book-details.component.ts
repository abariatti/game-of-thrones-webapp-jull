import { Observable } from 'rxjs';
import { ResourcesService } from './../../../../shared/services/resources.service';
import { Component, OnInit } from '@angular/core';
import { Book } from '../book';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent implements OnInit {

  constructor(private resourcesService: ResourcesService, private route: ActivatedRoute, private _location: Location) { }

  book!: Book;
  id: string | null = "";
  characters: string[] = [];
  povCharacters: string[] = [];
  loading = true;

  ngOnInit(): void {

    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.resourcesService.fetchResourceById(this.id, "books").subscribe(book => {
        this.book = book;
        this.loading = false;
        if (this.book.characters && this.book.characters.length > 0) {
          this.fetchNamesFromUrls(this.book.characters).toPromise().then(res => this.characters = res);
        }
        if (this.book.povCharacters && this.book.povCharacters.length > 0) {
          this.fetchNamesFromUrls(this.book.povCharacters).toPromise().then(res => this.povCharacters = res);
        }
      })
    }
  }

  fetchNameFromUrl(url: string): Observable<string> {
    return this.resourcesService.fetchNameFromUrl(url);
  }

  fetchNamesFromUrls(urls: string[]): Observable<string[]> {
    return this.resourcesService.fetchNamesFromUrls(urls);
  }

  routeBack(): void {
    this._location.back();
  }

}

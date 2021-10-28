import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ResourcesService } from './../../../../shared/services/resources.service';
import { Character } from './../character';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';



@Component({
  selector: 'app-character-details',
  templateUrl: './character-details.component.html',
  styleUrls: ['./character-details.component.scss']
})
export class CharacterDetailsComponent implements OnInit {

  character!: Character;
  father!: string;
  mother!: string;
  spouse!: string;
  books$!: Observable<string[]>;
  id: string | null = "";
  books: string[] = [];
  allegiances: string[] = [];
  loading = true;

  constructor(private resourcesService: ResourcesService, private route: ActivatedRoute, private _location: Location) { }

  ngOnInit(): void {

    this.id = this.route.snapshot.paramMap.get('id');

    if (this.id) {
      this.resourcesService.fetchResourceById(this.id, "characters").subscribe(character => {
        this.character = character;
        this.loading = false;
        if (this.character.father) {
          this.fetchNameFromUrl(this.character.father).toPromise().then(res => this.father = res);
        }
        if (this.character.mother) {
          this.fetchNameFromUrl(this.character.mother).toPromise().then(res => this.mother = res);;
        }
        if (this.character.spouse) {
          this.fetchNameFromUrl(this.character.spouse).toPromise().then(res => this.spouse = res);;
        }

        if (this.character.books && this.character.books.length > 0) {
          //this.books$ = this.fetchNamesFromUrls(this.character.books);
          this.fetchNamesFromUrls(this.character.books).toPromise().then(res => this.books = res)
        }
        if (this.character.allegiances && this.character.allegiances.length > 0) {
          this.fetchNamesFromUrls(this.character.allegiances).toPromise().then(res => this.allegiances = res);;
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

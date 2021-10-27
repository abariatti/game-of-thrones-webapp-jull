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
  father$!: Observable<string>;
  mother$!: Observable<string>;
  spouse$!: Observable<string>;
  books$!: Observable<string[]>;
  allegiances$!: Observable<string[]>;
  id: string | null = "";


  constructor(private resourcesService: ResourcesService, private route: ActivatedRoute, private _location: Location) { }

  ngOnInit(): void {

    this.id = this.route.snapshot.paramMap.get('id');

    if (this.id) {
      this.resourcesService.fetchResourceById(this.id, "characters").subscribe(character => {
        this.character = character;
        if (this.character.father) {
          this.father$ = this.fetchNameFromUrl(this.character.father);
        }
        if (this.character.mother) {
          this.mother$ = this.fetchNameFromUrl(this.character.mother);
        }
        if (this.character.spouse) {
          this.spouse$ = this.fetchNameFromUrl(this.character.spouse);
        }

        if (this.character.books && this.character.books.length > 0) {
          this.books$ = this.fetchNamesFromUrls(this.character.books);
        }
        if (this.character.allegiances && this.character.allegiances.length > 0) {
          this.allegiances$ = this.fetchNamesFromUrls(this.character.allegiances);
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

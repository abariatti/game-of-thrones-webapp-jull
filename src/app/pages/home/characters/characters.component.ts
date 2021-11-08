import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { extractIdFromUrl } from './../../../shared/helpers/extract-id';
import { ResourcesService } from './../../../shared/services/resources.service';
import { Character, CharacterFilter } from './character';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss']
})
export class CharactersComponent implements OnInit, OnDestroy {

  characters: Character[] = [];
  loading = true;
  searchInput = "";
  filter: CharacterFilter = {
    status: "",
    gender: "",
  };
  modelChanged: Subject<string> = new Subject<string>();


  constructor(private resourcesService: ResourcesService, private router: Router) {
    // include debouncing for search input field to limit api requests
    this.modelChanged.pipe(
      debounceTime(500),
      distinctUntilChanged())
      .subscribe(model => {
        this.searchInput = model;
      });
  }

  get currentPageNumber() {
    return this.resourcesService.currentPageNumber;
  }

  get numberOfPages() {
    return this.resourcesService.numberOfPages;
  }

  get showLoadMoreButton() {
    return this.resourcesService.currentPageNumber < this.resourcesService.numberOfPages;
  }

  ngOnInit(): void {
    this.loading = true;
    this.resourcesService.resetCurrentPageNumber();
    this.getResources();
  }

  ngOnDestroy(): void {
    this.modelChanged.unsubscribe();
  }

  // when search input field value changes
  changed(text: string) {
    this.modelChanged.next(text);
  }

  // fetch characters data from api
  getResources(): void {
    this.resourcesService.getResources(this.filter, this.searchInput, "characters")
      .subscribe(characters => {
        this.characters = characters;
        this.loading = false;
      });
  }

  // fetch more characters from api once user scrolled to end of character list
  loadMoreData(): void {
    if (this.resourcesService.currentPageNumber <= this.resourcesService.numberOfPages) {
      this.resourcesService.getResources(this.filter, '', "characters").subscribe(characters => this.characters = [...this.characters, ...characters])
    }
  }

  // filter results
  filterCharacters(newVal: string, target: string): void {
    if (newVal !== this.filter[target]) {
      this.filter[target] = newVal;
      this.resourcesService.resetCurrentPageNumber();
      this.getResources();
    }
  }


  // male and female characters should display different images
  getImgUrl(gender: string): string {
    switch (gender) {
      case "Female":
        return "../../../../assets/img/female-warrior.jpg";
      case "Male":
        return "../../../../assets/img/male-warrior.jpg";
      default:
        return ""
    }
  }

  extractIdFromUrl(url: string): string {
    return extractIdFromUrl(url);
  }

  onRoute(resource: string): void {
    this.router.navigate(["/home/" + resource]);
  }

}

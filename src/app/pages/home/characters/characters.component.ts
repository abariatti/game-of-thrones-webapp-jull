import { Router } from '@angular/router';
import { ResourcesService } from './../../../shared/services/resources.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Character, CharacterFilter } from './character';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { extractIdFromUrl } from './../../../shared/helpers/extract-id';

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
  showLoadMoreButton = true;
  modelChanged: Subject<string> = new Subject<string>();



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
        if (this.resourcesService._currentPageNumber < this.resourcesService._numberOfPages && this.searchInput === "") {
          this.showLoadMoreButton = true;
        } else {
          this.showLoadMoreButton = false;
        }
      });
  }

  // fetch more characters from api once user scrolled to end of character list
  loadMoreData(): void {
    if (this.resourcesService.currentPageNumber <= this.resourcesService.numberOfPages) {
      this.resourcesService.getResources(this.filter, this.searchInput, "characters").subscribe(characters => this.characters = [...this.characters, ...characters])
      if (this.resourcesService.currentPageNumber === this.resourcesService.numberOfPages) {
        this.showLoadMoreButton = false;
      }
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

  // filter results
  filterCharacters(newVal: string, target: string): void {
    if (newVal !== this.filter[target]) {
      this.filter[target] = newVal;
      this.resourcesService.resetCurrentPageNumber();
      this.getResources();
    }
  }

  // when user searches via input field, new data must be fetched from server
  onSearchChange(term: string) {
    this.resourcesService.resetCurrentPageNumber();
    if (term === "") {
      this.showLoadMoreButton = true;
    } else {
      this.showLoadMoreButton = false;
    }
    this.resourcesService.getResources(this.filter, term, "characters").subscribe(characters => this.characters = characters)
  }

  extractIdFromUrl(url: string): string {
    return extractIdFromUrl(url);
  }

  onRoute(resource: string): void {
    this.router.navigate(["/home/" + resource]);
  }

}

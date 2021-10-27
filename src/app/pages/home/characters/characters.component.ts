import { ResourcesService } from './../../../shared/services/resources.service';
import { CharacterDetailsComponent } from './character-details/character-details.component';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Character, CharacterFilter } from './character';
import { NbDialogService } from '@nebular/theme';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Subject } from 'rxjs';



@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss']
})
export class CharactersComponent implements OnInit, OnDestroy {

  characters: Character[] = [];
  loading = false;
  searchInput = "";
  filter: CharacterFilter = {
    status: "",
    gender: "",
  };
  showLoadMoreButton = true;
  modelChanged: Subject<string> = new Subject<string>();


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
      .subscribe(characters => this.characters = characters);
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

  // method to open dialog window with character details
  openDialog(character: Character) {
    this.dialogService.open(CharacterDetailsComponent, {
      context: {
        character: character
      },
    });
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
      this.showLoadMoreButton = true;
      this.filter[target] = newVal;
      this.resourcesService.resetCurrentPageNumber();
      this.getResources();
    }
  }

  onSearchChange(term: string) {
    this.resourcesService.resetCurrentPageNumber();
    this.resourcesService.getResources(this.filter, term, "characters").subscribe(characters => this.characters = characters)
  }

}

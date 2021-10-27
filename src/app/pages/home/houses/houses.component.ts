import { Router } from '@angular/router';
import { ResourcesService } from './../../../shared/services/resources.service';
import { HouseDetailsComponent } from './house-details/house-details.component';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { House, HouseFilter } from './house';
import { NbDialogService } from '@nebular/theme';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { extractIdFromUrl } from './../../../shared/helpers/extract-id';


@Component({
  selector: 'app-houses',
  templateUrl: './houses.component.html',
  styleUrls: ['./houses.component.scss']
})
export class HousesComponent implements OnInit, OnDestroy {

  houses: House[] = [];
  placeholders = [];
  pageSize = 10;
  pageToLoadNext = 1;
  loading = true;
  searchInput = "";
  filter: HouseFilter = {
    hasWords: false,
    hasTitles: false,
    hasSeats: false,
    hasDiedOut: false,
    hasAncestralWeapons: false,
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
    this.resourcesService.resetCurrentPageNumber();
    this.getHouses();
  }

  ngOnDestroy(): void {
    this.modelChanged.unsubscribe();
  }

  // when search input field value changes
  changed(text: string) {
    this.modelChanged.next(text);
  }

  // fetch characters data from api
  getHouses(): void {
    this.resourcesService.getResources(this.filter, this.searchInput, "houses")
      .subscribe(houses => {
        this.houses = houses;
        this.loading = false;
        if (this.resourcesService._currentPageNumber < this.resourcesService._numberOfPages && this.searchInput === "") {
          this.showLoadMoreButton = true;
        } else {
          this.showLoadMoreButton = false;
        }
      });
  }


  // fetch more houses from api once user scrolled to end of houses list
  loadMoreData(): void {
    if (this.resourcesService.currentPageNumber <= this.resourcesService.numberOfPages) {
      this.resourcesService.getResources(this.filter, this.searchInput, "houses").subscribe(houses => this.houses = [...this.houses, ...houses])
      if (this.resourcesService.currentPageNumber === this.resourcesService.numberOfPages) {
        this.showLoadMoreButton = false;
      }
    }
  }

  // filter results
  filterHouses(newVal: any, target: string): void {
    if (newVal !== this.filter[target]) {
      this.filter[target] = newVal;
      this.resourcesService.resetCurrentPageNumber();
      this.getHouses();
    }
  }

  onSearchChange(term: string) {
    this.resourcesService.resetCurrentPageNumber();
    if (term === "") {
      this.showLoadMoreButton = true;
    } else {
      this.showLoadMoreButton = false;
    }
    this.resourcesService.getResources(this.filter, term, "houses").subscribe(houses => this.houses = houses)
  }

  extractIdFromUrl(url: string): string {
    return extractIdFromUrl(url);
  }

  onRoute(resource: string): void {
    this.router.navigate(["/home/" + resource]);
  }

}

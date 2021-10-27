import { ResourcesService } from './../../../shared/services/resources.service';
import { HouseDetailsComponent } from './house-details/house-details.component';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { House, HouseFilter } from './house';
import { NbDialogService } from '@nebular/theme';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

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
  loading = false;
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
      .subscribe(houses => this.houses = houses);
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

  // method to open dialog window with character details
  openDialog(house: House) {
    this.dialogService.open(HouseDetailsComponent, {
      context: {

      },
    });
  }

  // filter results
  filterHouses(newVal: any, target: string): void {
    console.log(newVal);
    console.log(target);
    if (newVal !== this.filter[target]) {
      this.showLoadMoreButton = true;
      this.filter[target] = newVal;
      this.resourcesService.resetCurrentPageNumber();
      this.getHouses();
    }

  }

  onSearchChange(term: string) {
    this.resourcesService.resetCurrentPageNumber();
    this.resourcesService.getResources(this.filter, term, "houses").subscribe(houses => this.houses = houses)
  }

}

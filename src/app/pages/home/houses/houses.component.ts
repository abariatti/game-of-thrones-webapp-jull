import { HouseDetailsComponent } from './house-details/house-details.component';
import { HousesService } from './houses.service';
import { Component, OnInit, Input } from '@angular/core';
import { House } from './house';
import { NbDialogService } from '@nebular/theme';

@Component({
  selector: 'app-houses',
  templateUrl: './houses.component.html',
  styleUrls: ['./houses.component.scss']
})
export class HousesComponent implements OnInit {

  houses: House[] = [];
  placeholders = [];
  pageSize = 10;
  pageToLoadNext = 1;
  loading = false;
  @Input() searchInput = "";

  constructor(private housesService: HousesService, private dialogService: NbDialogService) { }

  ngOnInit(): void {
    this.getHouses();
  }

  // fetch characters data from api
  getHouses(): void {
    this.housesService.getHouses()
      .subscribe(houses => this.houses = houses);
  }

  // fetch more characters from api once user scrolled to end of character list
  loadMoreData(): void {
    if (this.housesService.currentPageNumber <= this.housesService.pageSize) {
      this.housesService.getHouses().subscribe(houses => this.houses = [...this.houses, ...houses])
    }
  }

  // method to open dialog window with character details
  openDialog(house: House) {
    this.dialogService.open(HouseDetailsComponent, {
      context: {

      },
    });
  }

}

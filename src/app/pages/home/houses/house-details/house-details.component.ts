import { ResourcesService } from './../../../../shared/services/resources.service';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { House } from '../house';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';



@Component({
  selector: 'app-house-details',
  templateUrl: './house-details.component.html',
  styleUrls: ['./house-details.component.scss']
})
export class HouseDetailsComponent implements OnInit {

  house!: House;
  overlord$!: Observable<string>;
  currentLord$!: Observable<string>;
  heir$!: Observable<string>;
  founder$!: Observable<string>;
  swornMembers$!: Observable<string[]>;
  id: string | null = "";

  constructor(private resourcesService: ResourcesService, private route: ActivatedRoute, private _location: Location) { }

  ngOnInit(): void {

    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.resourcesService.fetchResourceById(this.id, "houses").subscribe(house => {
        this.house = house;
        if (this.house.overlord) {
          this.overlord$ = this.fetchNameFromUrl(this.house.overlord);
        }
        if (this.house.currentLord) {
          this.currentLord$ = this.fetchNameFromUrl(this.house.currentLord);
        }
        if (this.house.heir) {
          this.heir$ = this.fetchNameFromUrl(this.house.heir);
        }
        if (this.house.founder) {
          this.founder$ = this.fetchNameFromUrl(this.house.founder);
        }
        if (this.house.swornMembers && this.house.swornMembers.length > 0) {
          this.swornMembers$ = this.fetchNamesFromUrls(this.house.swornMembers);
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

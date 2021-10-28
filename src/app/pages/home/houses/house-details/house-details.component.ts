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
  id: string | null = "";
  overLord = "";
  currentLord = "";
  heir = "";
  founder = "";
  swornMembers: string[] = [];

  constructor(private resourcesService: ResourcesService, private route: ActivatedRoute, private _location: Location) { }

  ngOnInit(): void {

    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.resourcesService.fetchResourceById(this.id, "houses").subscribe(house => {
        this.house = house;
        if (this.house.overlord) {
          this.fetchNameFromUrl(this.house.overlord).toPromise().then(res => this.overLord = res);
        }
        if (this.house.currentLord) {
          this.fetchNameFromUrl(this.house.currentLord).toPromise().then(res => this.currentLord = res);
        }
        if (this.house.heir) {
          this.fetchNameFromUrl(this.house.heir).toPromise().then(res => this.heir = res);
        }
        if (this.house.founder) {
          this.fetchNameFromUrl(this.house.founder).toPromise().then(res => this.founder = res);
        }
        if (this.house.swornMembers && this.house.swornMembers.length > 0) {
          this.fetchNamesFromUrls(this.house.swornMembers).toPromise().then(res => this.swornMembers = res);
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

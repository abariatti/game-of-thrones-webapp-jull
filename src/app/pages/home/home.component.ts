import { Component } from '@angular/core';


enum ActiveResource {
  CHARACTERS,
  HOUSES,
  BOOKS,
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  StateActiveResource = ActiveResource;
  activeResource: ActiveResource = ActiveResource.CHARACTERS;
  searchInput = '';

  constructor() { }



  get resource() {
    switch (this.activeResource) {
      case ActiveResource.CHARACTERS:
        return "Characters"
        break;
      case ActiveResource.HOUSES:
        return "Houses"
        break;
      case ActiveResource.BOOKS:
        return "Books"
        break;

      default:
        return "";
        break;
    }
  }

  // sets activeResource to next / previous one
  onUpdateActiveResource(direction: string) {
    console.log(this.activeResource);

    if (direction === 'forward') {

      if (this.activeResource === 2) {
        this.activeResource = 0;
      } else {
        this.activeResource++;
      }
    } else {
      if (this.activeResource === 0) {
        this.activeResource = 2;
      } else {
        this.activeResource--;
      }
    }

  }

}

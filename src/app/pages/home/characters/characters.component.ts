import { CharacterDetailsComponent } from './character-details/character-details.component';
import { CharactersService } from './characters.service';
import { Component, OnInit, Input } from '@angular/core';
import { Character } from './character';
import { NbDialogService } from '@nebular/theme';


@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss']
})
export class CharactersComponent implements OnInit {

  characters: Character[] = [];
  placeholders = [];
  pageSize = 10;
  pageToLoadNext = 1;
  loading = false;
  sortDirection: "asc" | "desc" | "" = "";
  @Input() searchInput = "";

  constructor(private charactersService: CharactersService, private dialogService: NbDialogService) {

  }

  ngOnInit(): void {
    this.getCharacters();
  }

  // fetch characters data from api
  getCharacters(): void {
    this.charactersService.getCharacters()
      .subscribe(characters => this.characters = characters);
  }

  // fetch more characters from api once user scrolled to end of character list
  loadMoreData(): void {
    if (this.charactersService.currentPageNumber <= this.charactersService.pageSize) {
      this.charactersService.getCharacters().subscribe(characters => this.characters = [...this.characters, ...characters])
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
        break;
      case "Male":
        return "../../../../assets/img/male-warrior.jpg";
        break;
      default:
        return ""
        break;
    }
  }



}

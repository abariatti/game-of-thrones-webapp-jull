import { CharactersService } from './characters.service';
import { Component, OnInit } from '@angular/core';
import { Character } from './character';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss']
})
export class CharactersComponent implements OnInit {

  characters: Character[] = [];


  constructor(private charactersService: CharactersService) {

  }

  ngOnInit(): void {
    this.getCharacters();
  }

  getCharacters(): void {
    this.charactersService.getCharacters()
      .subscribe(characters => this.characters = characters);
  }

}

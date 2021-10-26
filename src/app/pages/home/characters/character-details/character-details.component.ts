import { Character } from './../character';
import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'app-character-details',
  templateUrl: './character-details.component.html',
  styleUrls: ['./character-details.component.scss']
})
export class CharacterDetailsComponent implements OnInit {

  character: Character | null = null

  constructor(protected dialogRef: NbDialogRef<CharacterDetailsComponent>) { }

  ngOnInit(): void {
    console.log(this.character);

  }

  close() {
    this.dialogRef.close();
  }

}

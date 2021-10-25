import { CharactersService } from './characters/characters.service';
import { HousesComponent } from './houses/houses.component';
import { BooksComponent } from './books/books.component';
import { CharactersComponent } from './characters/characters.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from "./home-routing.module";
import { NbTabsetModule, NbCardModule, NbListModule } from '@nebular/theme';



@NgModule({
  declarations: [
    HomeComponent,
    CharactersComponent,
    BooksComponent,
    HousesComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    NbTabsetModule,
    NbCardModule,
    NbListModule,
  ],
  providers: [
    CharactersService,

  ],
})
export class HomeModule { }

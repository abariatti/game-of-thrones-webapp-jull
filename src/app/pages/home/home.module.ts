import { SortPipe } from './../../shared/pipes/sort.pipe';
import { SearchPipe } from './../../shared/pipes/filter.pipe';
import { HousesComponent } from './houses/houses.component';
import { BooksComponent } from './books/books.component';
import { CharactersComponent } from './characters/characters.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from "./home-routing.module";
import { NbTabsetModule, NbCardModule, NbListModule, NbButtonModule, NbInputModule, NbFormFieldModule, NbDialogModule, NbActionsModule, NbTooltipModule, NbUserModule, NbCheckboxModule, NbDatepickerModule, NbSelectModule, NbSpinnerModule, NbAlertModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { NbIconModule } from '@nebular/theme';
import { FormsModule } from '@angular/forms';
import { CharacterDetailsComponent } from './characters/character-details/character-details.component';
import { HouseDetailsComponent } from './houses/house-details/house-details.component';
import { BookDetailsComponent } from './books/book-details/book-details.component';



@NgModule({
  declarations: [
    CharactersComponent,
    BooksComponent,
    HousesComponent,
    SearchPipe,
    SortPipe,
    CharacterDetailsComponent,
    HouseDetailsComponent,
    BookDetailsComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    NbTabsetModule,
    NbCardModule,
    NbListModule,
    NbEvaIconsModule,
    NbIconModule,
    NbButtonModule,
    NbInputModule,
    NbFormFieldModule,
    FormsModule,
    NbDialogModule.forRoot(),
    NbActionsModule,
    NbTooltipModule,
    NbUserModule,
    NbCheckboxModule,
    NbDatepickerModule.forRoot(),
    NbSelectModule,
    NbSpinnerModule,
    NbAlertModule,
  ],
  providers: [
  ],
})
export class HomeModule { }

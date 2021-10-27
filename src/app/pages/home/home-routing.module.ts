import { BooksComponent } from './books/books.component';
import { HousesComponent } from './houses/houses.component';
import { CharactersComponent } from './characters/characters.component';
import { BookDetailsComponent } from './books/book-details/book-details.component';
import { HouseDetailsComponent } from './houses/house-details/house-details.component';
import { CharacterDetailsComponent } from './characters/character-details/character-details.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [


    {
        path: 'characters',
        component: CharactersComponent,
    },
    {
        path: 'houses',
        component: HousesComponent
    },
    {
        path: 'books',
        component: BooksComponent
    },
    {
        path: 'characters/:id',
        component: CharacterDetailsComponent,
    },

    {
        path: 'houses/:id',
        component: HouseDetailsComponent
    },
    {
        path: 'books/:id',
        component: BookDetailsComponent
    },
    {
        path: "", redirectTo: "characters", pathMatch: "full"
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HomeRoutingModule { }
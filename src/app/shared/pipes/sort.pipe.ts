import { Pipe, PipeTransform } from '@angular/core';



@Pipe({
    name: 'sort'
})
export class SortPipe implements PipeTransform {
    transform(items: [], direction: string, column: string) {
        let sortedItems = [];
        switch (direction) {
            case 'asc':
                return this.sortAscending(items, column)
                break;
            case 'asc':
                return this.sortDescending(items, column)
                break;
            default:
                return items;
                break;
        }
    }
    sortAscending(items: [], column: string) {
        return [...items.sort(function (a: any, b: any) {
            if (a[column].toUpperCase() < b[column].toUpperCase()) {
                return -1;
            } else {
                return 1;
            }
        })]
    }
    sortDescending(items: any[], column: string) {
        return [...items.sort(function (a: any, b: any) {
            if (a[column].toUpperCase() > b[column].toUpperCase()) {
                return -1;
            } else {
                return 1;
            }
        })]
    }
}
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {
  public transform(items: any[], term: string): any {

    return term
      ? items.filter(item => item.name.toLowerCase().indexOf(term.toLowerCase()) !== -1)
      : items;
  }
}
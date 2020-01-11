import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'subItemFilter'
})
export class SubItemFilterPipe implements PipeTransform {

  transform(items: any, searchItem: any, searchField: any): any {
    if(!items) return;
    if(!searchItem || !searchField) return items;
    return items.filter( it=> {
      return it[`${searchField}`] == searchItem
    })
  }

}

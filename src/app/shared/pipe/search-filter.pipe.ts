import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {

  transform(items: any, searchText: any, searchField?: any): any {
    if (!searchText) return items

    const toCompare = searchText.toLowerCase();
    function checkInside(item, term) {
      for (let property in item) {
        if (item[property] === null || item[property] == undefined) {
          continue;
        }
        if (typeof item[property] === 'object') {
          if (checkInside(item[property], term)) {
            return true;
          }
        }
        if(searchField) property = searchField 
        if (item[property].toString().toLowerCase().includes(toCompare)) {
          return true;
        }
      }
      return false;
    }
    
    var isArray = items instanceof Array
    if (isArray) {
      return items.filter(item => {
        return checkInside(item, searchText)
      })
    }
  }

}

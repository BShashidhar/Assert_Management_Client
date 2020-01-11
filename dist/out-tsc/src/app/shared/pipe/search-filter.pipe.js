import * as tslib_1 from "tslib";
import { Pipe } from '@angular/core';
let SearchFilterPipe = class SearchFilterPipe {
    transform(items, searchText, searchField) {
        if (!searchText)
            return items;
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
                if (searchField)
                    property = searchField;
                if (item[property].toString().toLowerCase().includes(toCompare)) {
                    return true;
                }
            }
            return false;
        }
        var isArray = items instanceof Array;
        if (isArray) {
            return items.filter(item => {
                return checkInside(item, searchText);
            });
        }
    }
};
SearchFilterPipe = tslib_1.__decorate([
    Pipe({
        name: 'searchFilter'
    })
], SearchFilterPipe);
export { SearchFilterPipe };
//# sourceMappingURL=search-filter.pipe.js.map
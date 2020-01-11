import * as tslib_1 from "tslib";
import { Pipe } from '@angular/core';
let SubItemFilterPipe = class SubItemFilterPipe {
    transform(items, searchItem, searchField) {
        if (!items)
            return;
        if (!searchItem || !searchField)
            return items;
        return items.filter(it => {
            return it[`${searchField}`] == searchItem;
        });
    }
};
SubItemFilterPipe = tslib_1.__decorate([
    Pipe({
        name: 'subItemFilter'
    })
], SubItemFilterPipe);
export { SubItemFilterPipe };
//# sourceMappingURL=sub-item-filter.pipe.js.map
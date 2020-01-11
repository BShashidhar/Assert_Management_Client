import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
let DataService = class DataService {
    constructor() {
        this.dataSource = new BehaviorSubject(undefined);
        this.currentData = this.dataSource.asObservable();
    }
    changeData(data) {
        this.dataSource.next(data);
    }
};
DataService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    }),
    tslib_1.__metadata("design:paramtypes", [])
], DataService);
export { DataService };
//# sourceMappingURL=data.service.js.map
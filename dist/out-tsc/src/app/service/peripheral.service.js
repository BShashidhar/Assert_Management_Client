import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Api } from './URL';
let PeripheralService = class PeripheralService {
    constructor(_http) {
        this._http = _http;
        this.peripherals = [];
    }
    setPeripherals() {
        return new Promise((res, rej) => {
            this._http.get(Api.BASE_URL + "/management" + Api.getAllPeripherals)
                .subscribe(data => {
                this.peripherals = data.result;
                res(data.result);
            }, err => {
                rej(err);
            });
        });
    }
    getPeripherals() {
        return this.peripherals;
    }
    addPeripherals(item) {
        return new Promise((res, rej) => {
            this._http.post(Api.BASE_URL + "/management" + Api.addPeripherals, item)
                .subscribe(data => {
                this.peripherals = data.result;
                return res(true);
            }, err => {
                return rej(err);
            });
        });
    }
    updatePeripherals(item) {
        return new Promise((res, rej) => {
            this._http.post(Api.BASE_URL + "/management" + Api.updatePeripherals, item)
                .subscribe(data => {
                this.peripherals = data.result;
                return res(true);
            }, err => {
                return rej(err);
            });
        });
    }
    deletePeripherals(item) {
        return new Promise((res, rej) => {
            this._http.post(Api.BASE_URL + "/management" + Api.deletePeripherals, item)
                .subscribe(data => {
                this.peripherals = data.result;
                return res(true);
            }, err => {
                return rej(err);
            });
        });
    }
};
PeripheralService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    }),
    tslib_1.__metadata("design:paramtypes", [HttpClient])
], PeripheralService);
export { PeripheralService };
//# sourceMappingURL=peripheral.service.js.map
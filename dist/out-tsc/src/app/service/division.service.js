import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Api } from './URL';
let DivisionService = class DivisionService {
    constructor(_http) {
        this._http = _http;
        this.Division = [];
    }
    setDivision() {
        return new Promise((res, rej) => {
            this._http.get(Api.BASE_URL + "/management" + Api.getAllDivision)
                .subscribe(data => {
                this.Division = data.result;
                res(data.result);
            }, err => {
                rej(err);
            });
        });
    }
    getDivision() {
        return this.Division;
    }
    addDivision(item) {
        return new Promise((res, rej) => {
            this._http.post(Api.BASE_URL + "/management" + Api.addDivision, item)
                .subscribe(data => {
                this.Division = data.result;
                return res(true);
            }, err => {
                return rej(err);
            });
        });
    }
    updateDivision(item) {
        return new Promise((res, rej) => {
            this._http.post(Api.BASE_URL + "/management" + Api.updateDivision, item)
                .subscribe(data => {
                this.Division = data.result;
                return res(true);
            }, err => {
                return rej(err);
            });
        });
    }
    deleteDivision(item) {
        return new Promise((res, rej) => {
            this._http.post(Api.BASE_URL + "/management" + Api.deleteDivision, item)
                .subscribe(data => {
                this.Division = data.result;
                return res(true);
            }, err => {
                return rej(err);
            });
        });
    }
};
DivisionService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    }),
    tslib_1.__metadata("design:paramtypes", [HttpClient])
], DivisionService);
export { DivisionService };
//# sourceMappingURL=division.service.js.map
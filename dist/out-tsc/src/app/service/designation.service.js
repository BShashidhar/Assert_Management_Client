import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Api } from './URL';
let DesignationService = class DesignationService {
    constructor(_http) {
        this._http = _http;
        this.Designation = [];
    }
    setDesignation() {
        return new Promise((res, rej) => {
            this._http.get(Api.BASE_URL + "/management" + Api.getAllDesignation)
                .subscribe(data => {
                this.Designation = data.result;
                res(data.result);
            }, err => {
                rej(err);
            });
        });
    }
    getDesignation() {
        return this.Designation;
    }
    addDesignation(item) {
        return new Promise((res, rej) => {
            this._http.post(Api.BASE_URL + "/management" + Api.addDesignation, item)
                .subscribe(data => {
                this.Designation = data.result;
                return res(true);
            }, err => {
                return rej(err);
            });
        });
    }
    updateDesignation(item) {
        return new Promise((res, rej) => {
            this._http.post(Api.BASE_URL + "/management" + Api.updateDesignation, item)
                .subscribe(data => {
                this.Designation = data.result;
                return res(true);
            }, err => {
                return rej(err);
            });
        });
    }
    deleteDesignation(item) {
        return new Promise((res, rej) => {
            this._http.post(Api.BASE_URL + "/management" + Api.deleteDesignation, item)
                .subscribe(data => {
                this.Designation = data.result;
                return res(true);
            }, err => {
                return rej(err);
            });
        });
    }
};
DesignationService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    }),
    tslib_1.__metadata("design:paramtypes", [HttpClient])
], DesignationService);
export { DesignationService };
//# sourceMappingURL=designation.service.js.map
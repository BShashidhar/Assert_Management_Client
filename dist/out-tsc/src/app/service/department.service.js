import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Api } from './URL';
let DepartmentService = class DepartmentService {
    constructor(_http) {
        this._http = _http;
        this.department = [];
    }
    setDepartment() {
        return new Promise((res, rej) => {
            this._http.get(Api.BASE_URL + "/management" + Api.getAllDepartment)
                .subscribe(data => {
                this.department = data.result;
                res(data.result);
            }, err => {
                rej(err);
            });
        });
    }
    getDepartment() {
        return this.department;
    }
    addDepartment(item) {
        return new Promise((res, rej) => {
            this._http.post(Api.BASE_URL + "/management" + Api.addDepartment, item)
                .subscribe(data => {
                this.department = data.result;
                return res(true);
            }, err => {
                return rej(err);
            });
        });
    }
    updateDepartment(item) {
        return new Promise((res, rej) => {
            this._http.post(Api.BASE_URL + "/management" + Api.updateDepartment, item)
                .subscribe(data => {
                this.department = data.result;
                return res(true);
            }, err => {
                return rej(err);
            });
        });
    }
    deleteDepartment(item) {
        return new Promise((res, rej) => {
            this._http.post(Api.BASE_URL + "/management" + Api.deleteDepartment, item)
                .subscribe(data => {
                this.department = data.result;
                return res(true);
            }, err => {
                return rej(err);
            });
        });
    }
};
DepartmentService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    }),
    tslib_1.__metadata("design:paramtypes", [HttpClient])
], DepartmentService);
export { DepartmentService };
//# sourceMappingURL=department.service.js.map
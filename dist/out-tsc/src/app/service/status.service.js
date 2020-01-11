import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Api } from './URL';
let StatusService = class StatusService {
    constructor(_http) {
        this._http = _http;
        this.status = [];
    }
    setStatus() {
        return new Promise((res, rej) => {
            this._http.get(Api.BASE_URL + "/management" + Api.getAllStatus)
                .subscribe(data => {
                this.status = data.result;
                res(data.result);
            }, err => {
                rej(err);
            });
        });
    }
    getStatus() {
        return this.status;
    }
    addStatus(item) {
        return new Promise((res, rej) => {
            this._http.post(Api.BASE_URL + "/management" + Api.addStatus, item)
                .subscribe(data => {
                this.status = data.result;
                return res(true);
            }, err => {
                return rej(err);
            });
        });
    }
    updateStatus(item) {
        return new Promise((res, rej) => {
            this._http.post(Api.BASE_URL + "/management" + Api.updateStatus, item)
                .subscribe(data => {
                this.status = data.result;
                return res(true);
            }, err => {
                return rej(err);
            });
        });
    }
    deleteStatus(item) {
        return new Promise((res, rej) => {
            this._http.post(Api.BASE_URL + "/management" + Api.deleteStatus, item)
                .subscribe(data => {
                this.status = data.result;
                return res(true);
            }, err => {
                return rej(err);
            });
        });
    }
};
StatusService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    }),
    tslib_1.__metadata("design:paramtypes", [HttpClient])
], StatusService);
export { StatusService };
//# sourceMappingURL=status.service.js.map
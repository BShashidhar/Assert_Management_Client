import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Api } from './URL';
let AssetGroupService = class AssetGroupService {
    constructor(_http) {
        this._http = _http;
        this.assetgroup = [];
    }
    setAssetGroup() {
        return new Promise((res, rej) => {
            this._http.get(Api.BASE_URL + "/management" + Api.getAllAssetGroup)
                .subscribe(data => {
                this.assetgroup = data.result;
                return res(data.result);
            }, err => {
                return rej(err);
            });
        });
    }
    getAssetGroup() {
        return this.assetgroup;
    }
    addAssetGroup(item) {
        return new Promise((res, rej) => {
            this._http.post(Api.BASE_URL + "/management" + Api.addAssetGroup, item)
                .subscribe(data => {
                this.assetgroup = data.result;
                return res(true);
            }, err => {
                return rej(err);
            });
        });
    }
    updateAssetGroup(item) {
        return new Promise((res, rej) => {
            this._http.post(Api.BASE_URL + "/management" + Api.updateAssetGroup, item)
                .subscribe(data => {
                this.assetgroup = data.result;
                return res(true);
            }, err => {
                return rej(err);
            });
        });
    }
    deleteAssetGroup(item) {
        return new Promise((res, rej) => {
            this._http.post(Api.BASE_URL + "/management" + Api.deleteAssetGroup, item)
                .subscribe(data => {
                this.assetgroup = data.result;
                return res(true);
            }, err => {
                return rej(err);
            });
        });
    }
};
AssetGroupService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    }),
    tslib_1.__metadata("design:paramtypes", [HttpClient])
], AssetGroupService);
export { AssetGroupService };
//# sourceMappingURL=assetgroup.service.js.map
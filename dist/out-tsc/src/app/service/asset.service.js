import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Api } from './URL';
import { HttpClient } from '@angular/common/http';
let AssetService = class AssetService {
    constructor(_http) {
        this._http = _http;
    }
    getAssetNo(key) {
        return this._http.post(Api.BASE_URL + "/management" + Api.getAssetNo, { key: key });
    }
    addAsset(asset) {
        return this._http.post(Api.BASE_URL + "/management" + Api.addAsset, asset);
    }
    updateAsset(asset) {
        // if (asset.indent_date==null) {
        //   asset.indent_date="YYYY-MM-DD"
        // }
        return this._http.post(Api.BASE_URL + "/management" + Api.updateAsset, asset);
    }
    getAllAsset() {
        return this._http.get(Api.BASE_URL + "/management" + Api.getAllAsset);
    }
};
AssetService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    }),
    tslib_1.__metadata("design:paramtypes", [HttpClient])
], AssetService);
export { AssetService };
//# sourceMappingURL=asset.service.js.map
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Api } from './URL';
let AssetPeripheralService = class AssetPeripheralService {
    constructor(_http) {
        this._http = _http;
    }
    getPeripheralByAsset(asset_id) {
        return this._http.post(Api.BASE_URL + "/management" + Api.getPeripheralByAsset, { asset_id });
    }
    getAllAssetPeripheral() {
        return this._http.post(Api.BASE_URL + "/management" + Api.getAllAssetPeripheral, {});
    }
};
AssetPeripheralService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    }),
    tslib_1.__metadata("design:paramtypes", [HttpClient])
], AssetPeripheralService);
export { AssetPeripheralService };
//# sourceMappingURL=asset-peripheral.service.js.map
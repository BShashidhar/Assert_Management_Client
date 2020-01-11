import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Api } from './URL';

@Injectable({
  providedIn: 'root'
})
export class AssetPeripheralService {

  constructor(
    private _http: HttpClient
  ) { }

  getPeripheralByAsset(asset_id) {
    return this._http.post<any>(Api.BASE_URL + "/management" + Api.getPeripheralByAsset, { asset_id })
  }

  getAllAssetPeripheral() {
    return this._http.post<any>(Api.BASE_URL + "/management" + Api.getAllAssetPeripheral, {})
  }
}

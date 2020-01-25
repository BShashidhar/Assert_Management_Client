import { Injectable } from '@angular/core';
import { Api } from './URL';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AssetService {

  // Asset=[]

  constructor(
    private _http: HttpClient
  ) { }

  getAssetNo(key) {
    return this._http.post<any>(Api.BASE_URL + "/management" + Api.getAssetNo, { key: key })
  }

  getAssatById(asset_id) {
    return this._http.get<any>(Api.BASE_URL + "/management" + Api.getAssetId + "?asset_id=" + asset_id)
  }

  getAllAsset() {
    return this._http.get<any>(Api.BASE_URL + "/management" + Api.getAllAsset)
  }

  addAsset(asset) {
    return this._http.post<any>(Api.BASE_URL + "/management" + Api.addAsset, asset)
  }

  deleteAsset(asset) {
    return this._http.post<any>(Api.BASE_URL + "/management" + Api.deleteAsset, asset)
  }

  updateAsset(asset) {
    return this._http.post<any>(Api.BASE_URL + "/management" + Api.updateAsset, asset)
  }
}

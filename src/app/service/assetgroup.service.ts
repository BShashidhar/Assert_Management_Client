import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Api } from './URL';

@Injectable({
  providedIn: 'root'
})
export class AssetGroupService {

  assetgroup = []

  constructor(private _http: HttpClient) { }

  setAssetGroup() {
    return new Promise((res, rej) => {
      this._http.get<any>(Api.BASE_URL + "/management" + Api.getAllAssetGroup)
        .subscribe(data => {
          this.assetgroup = data.result
          return res(data.result)
        }, err => {
          return rej(err)
        })
    })
  }

  getAssetGroup() {
    return this.assetgroup
  }

  addAssetGroup(item) {
    return new Promise((res, rej) => {
      this._http.post<any>(Api.BASE_URL + "/management" + Api.addAssetGroup, item)
        .subscribe(data => {
          this.assetgroup = data.result
          return res(true)
        }, err => {
          return rej(err)
        })
    })
  }

  updateAssetGroup(item): any {
    return new Promise((res, rej) => {
      this._http.post<any>(Api.BASE_URL + "/management" + Api.updateAssetGroup, item)
        .subscribe(data => {
          this.assetgroup = data.result
          return res(true)
        }, err => {
          return rej(err)
        })
    })
  }

  deleteAssetGroup(item): any {
    return new Promise((res, rej) => {
      this._http.post<any>(Api.BASE_URL + "/management" + Api.deleteAssetGroup, item)
        .subscribe(data => {
          this.assetgroup = data.result
          return res(true)
        }, err => {
          return rej(err)
        })
    })
  }

}
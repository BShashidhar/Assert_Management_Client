import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Api } from './URL';

@Injectable({
  providedIn: 'root'
})
export class VendorService {

  vendor = []

  constructor(private _http: HttpClient) { }

  setVendor() {
    return new Promise((res, rej) => {
      this._http.get<any>(Api.BASE_URL + "/management" + Api.getAllVendor)
        .subscribe(data => {
          this.vendor = data.result
          res(data.result)
        }, err => {
          rej(err)
        })
    })
  }

  getVendor() {
    return this.vendor
  }

  addVendor(item) {
    return new Promise((res, rej) => {
      this._http.post<any>(Api.BASE_URL + "/management" + Api.addVendor, item)
        .subscribe(data => {
          this.vendor = data.result
          return res(true)
        }, err => {
          return rej(err)
        })
    })
  }

  updateVendor(item): any {
    return new Promise((res, rej) => {
      this._http.post<any>(Api.BASE_URL + "/management" + Api.updateVendor, item)
        .subscribe(data => {
          this.vendor = data.result
          return res(true)
        }, err => {
          return rej(err)
        })
    })
  }

  deleteVendor(item): any {
    return new Promise((res, rej) => {
      
      this._http.post<any>(Api.BASE_URL + "/management" + Api.deleteVendor, item)
        .subscribe(data => {
          this.vendor = data.result
          return res(true)
        }, err => {
          return rej(err)
        })
    })
  }
  getAllVendor() {
    return this._http.get<any>(Api.BASE_URL+"/management"+Api.getAllVendor)
  }

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Api } from './URL';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  location = []

  constructor(private _http: HttpClient) { }

  setLocation() {
    return new Promise((res, rej) => {
      this._http.get<any>(Api.BASE_URL + "/management" + Api.getAllLocation)
        .subscribe(data => {
          this.location = data.result
          res(data.result)
        }, err => {
          rej(err)
        })
    })
  }

  getLocation() {
    return this.location
  }

  addLocation(item) {
    return new Promise((res, rej) => {
      this._http.post<any>(Api.BASE_URL + "/management" + Api.addLocation, item)
        .subscribe(data => {
          this.location = data.result
          return res(true)
        }, err => {
          return rej(err)
        })
    })
  }

  updateLocation(item): any {
    return new Promise((res, rej) => {
      this._http.post<any>(Api.BASE_URL + "/management" + Api.updateLocation, item)
        .subscribe(data => {
          this.location = data.result
          return res(true)
        }, err => {
          return rej(err)
        })
    })
  }

  deleteLocation(item): any {
    return new Promise((res, rej) => {
      
      this._http.post<any>(Api.BASE_URL + "/management" + Api.deleteLocation, item)
        .subscribe(data => {
          this.location = data.result
          return res(true)
        }, err => {
          return rej(err)
        })
    })
  }
  getAllLocation() {
    return this._http.get<any>(Api.BASE_URL+"/management"+Api.getAllLocation)
  }

}

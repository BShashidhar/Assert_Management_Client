import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Api } from './URL';

@Injectable({
  providedIn: 'root'
})
export class DesignationService {

  Designation = []

  constructor(private _http: HttpClient) { }

  setDesignation() {
    return new Promise((res, rej) => {
      this._http.get<any>(Api.BASE_URL + "/management" + Api.getAllDesignation)
        .subscribe(data => {
          this.Designation = data.result
          res(data.result)
        }, err => {
          rej(err)
        })
    })
  }

  getDesignation() {
    return this.Designation
  }

  addDesignation(item) {
    return new Promise((res, rej) => {
      this._http.post<any>(Api.BASE_URL + "/management" + Api.addDesignation, item)
        .subscribe(data => {
          this.Designation = data.result
          return res(true)
        }, err => {
          return rej(err)
        })
    })
  }

  updateDesignation(item): any {
    return new Promise((res, rej) => {
      this._http.post<any>(Api.BASE_URL + "/management" + Api.updateDesignation, item)
        .subscribe(data => {
          this.Designation = data.result
          return res(true)
        }, err => {
          return rej(err)
        })
    })
  }

  deleteDesignation(item): any {
    return new Promise((res, rej) => {
      
      this._http.post<any>(Api.BASE_URL + "/management" + Api.deleteDesignation, item)
        .subscribe(data => {
          this.Designation = data.result
          return res(true)
        }, err => {
          return rej(err)
        })
    })
  }

}

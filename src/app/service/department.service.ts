import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Api } from './URL';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  department = []

  constructor(private _http: HttpClient) { }

  setDepartment() {
    return new Promise((res, rej) => {
      this._http.get<any>(Api.BASE_URL + "/management" + Api.getAllDepartment)
        .subscribe(data => {
          this.department = data.result
          res(data.result)
        }, err => {
          rej(err)
        })
    })
  }

  getDepartment() {
    return this.department
  }

  addDepartment(item) {
    return new Promise((res, rej) => {
      this._http.post<any>(Api.BASE_URL + "/management" + Api.addDepartment, item)
        .subscribe(data => {
          this.department = data.result
          return res(true)
        }, err => {
          return rej(err)
        })
    })
  }

  updateDepartment(item): any {
    return new Promise((res, rej) => {
      this._http.post<any>(Api.BASE_URL + "/management" + Api.updateDepartment, item)
        .subscribe(data => {
          this.department = data.result
          return res(true)
        }, err => {
          return rej(err)
        })
    })
  }

  deleteDepartment(item): any {
    return new Promise((res, rej) => {
      this._http.post<any>(Api.BASE_URL + "/management" + Api.deleteDepartment, item)
        .subscribe(data => {
          this.department = data.result
          return res(true)
        }, err => {
          return rej(err)
        })
    })
  }

}
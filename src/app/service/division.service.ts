import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Api } from './URL';

@Injectable({
  providedIn: 'root'
})
export class DivisionService {
  currentUserSubject: BehaviorSubject<any>
  currentUser: Observable<any>

  Division = []

  constructor(private _http: HttpClient) { }

  setDivision() {
    return new Promise<any[]>((res, rej) => {
      this._http.get<any>(Api.BASE_URL + "/management" + Api.getAllDivision)
        .subscribe(data => {
          this.Division = data.result
          res(data.result)
        }, err => {
          rej(err)
        })
    })
  }

  getDivision() {
    return this.Division
  }

  addDivision(item) {
    return new Promise((res, rej) => {
      this._http.post<any>(Api.BASE_URL + "/management" + Api.addDivision, item)
        .subscribe(data => {
          this.Division = data.result
          return res(true)
        }, err => {
          return rej(err)
        })
    })
  }

  updateDivision(item): any {
    return new Promise((res, rej) => {
      this._http.post<any>(Api.BASE_URL + "/management" + Api.updateDivision, item)
        .subscribe(data => {
          this.Division = data.result
          return res(true)
        }, err => {
          return rej(err)
        })
    })
  }

  deleteDivision(item): any {
    return new Promise((res, rej) => {
      this._http.post<any>(Api.BASE_URL + "/management" + Api.deleteDivision, item)
        .subscribe(data => {
          this.Division = data.result
          return res(true)
        }, err => {
          return rej(err)
        })
    })
  }

}
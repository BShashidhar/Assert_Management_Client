import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Api } from './URL';

@Injectable({
  providedIn: 'root'
})
export class StatusService {
  currentUserSubject: BehaviorSubject<any>
  currentUser: Observable<any>

  status = []

  constructor(private _http: HttpClient) { }

  setStatus() {
    return new Promise((res, rej) => {
    this._http.get<any>(Api.BASE_URL + "/management" + Api.getAllStatus)
      .subscribe(data => {
        this.status = data.result
        res(data.result)
      }, err => {
        rej(err)
      })
    })
  }

  getStatus() {
    return this.status
  }

  addStatus(item) {
    return new Promise((res, rej) => {
      this._http.post<any>(Api.BASE_URL + "/management" + Api.addStatus, item)
        .subscribe(data => {
          this.status = data.result
          return res(true)
        }, err => {
          return rej(err)
        })
    })
  }

  updateStatus(item): any {
    return new Promise((res, rej) => {
      this._http.post<any>(Api.BASE_URL + "/management" + Api.updateStatus, item)
        .subscribe(data => {
          this.status = data.result
          return res(true)
        }, err => {
          return rej(err)
        })

    })
  }

  deleteStatus(item): any {
    return new Promise((res, rej) => {
      this._http.post<any>(Api.BASE_URL + "/management" + Api.deleteStatus, item)
        .subscribe(data => {
          this.status = data.result
          return res(true)
        }, err => {
          return rej(err)
        })

    })
  }

}
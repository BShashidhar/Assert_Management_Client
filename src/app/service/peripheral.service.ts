import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Api } from './URL';

@Injectable({
  providedIn: 'root'
})
export class PeripheralService {

  peripherals = []

  constructor(private _http: HttpClient) { }

  setPeripherals() {
    return new Promise<any[]>((res, rej) => {
      this._http.get<any>(Api.BASE_URL + "/management" + Api.getAllPeripherals)
        .subscribe(data => {
          this.peripherals = data.result
          res(data.result)
        }, err => {
          rej(err)
        })
    })
  }

  getPeripherals() {
    return this.peripherals
  }

  addPeripherals(item) {
    return new Promise((res, rej) => {
      this._http.post<any>(Api.BASE_URL + "/management" + Api.addPeripherals, item)
        .subscribe(data => {
          this.peripherals = data.result                     
          return res(true)
        }, err => {
          return rej(err)
        }) 
    })
  }

  updatePeripherals(item): any {
    return new Promise((res, rej) => {
      this._http.post<any>(Api.BASE_URL + "/management" + Api.updatePeripherals, item)
        .subscribe(data => {
          this.peripherals = data.result
          return res(true)
        }, err => {
          return rej(err)
        })
    })
  }

  deletePeripherals(item): any {
    return new Promise((res, rej) => {
      this._http.post<any>(Api.BASE_URL + "/management" + Api.deletePeripherals, item)
        .subscribe(data => {
          this.peripherals = data.result
          return res(true)
        }, err => {
          return rej(err)
        })
    })
  }

}
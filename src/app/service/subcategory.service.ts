import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Api } from './URL';

@Injectable({
  providedIn: 'root'
})
export class SubCategoryService {
  currentUserSubject: BehaviorSubject<any>
  currentUser: Observable<any>

  subcategories = []

  constructor(private _http: HttpClient) { }

  setSubCategories() {
    return new Promise<any[]>((res, rej) => {
      this._http.get<any>(Api.BASE_URL + "/management" + Api.getAllSubCategory)
        .subscribe(data => {
          this.subcategories = data.result
          res(data.result)
        }, err => {
          rej(err)
        })
    })
  }

  getSubCategories() {
    return this.subcategories
  }

  addSubCategory(item) {
    return new Promise((res, rej) => {
      this._http.post<any>(Api.BASE_URL + "/management" + Api.addSubCategory, item)
        .subscribe(data => {
          this.subcategories = data.result
          return res(true)
        }, err => {
          return rej(err)
        })
    })
  }

  updateSubCategory(item): any {
    return new Promise((res, rej) => {
      this._http.post<any>(Api.BASE_URL + "/management" + Api.updateSubCategory, item)
        .subscribe(data => {
          this.subcategories = data.result
          return res(true)
        }, err => {
          return rej(err)
        })

    })
  }

  deleteSubCategory(item): any {
    return new Promise((res, rej) => {
      this._http.post<any>(Api.BASE_URL + "/management" + Api.deleteSubCategory, item)
        .subscribe(data => {
          this.subcategories = data.result
          return res(true)
        }, err => {
          return rej(err)
        })

    })
  }

}
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Api } from './URL';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  categories = []

  constructor(private _http: HttpClient) { }

  setCategories() {
    return  new Promise<any[]>((res, rej) => {
      return this._http.get<any>(Api.BASE_URL + "/management" + Api.getAllCategory)
        .subscribe(data => {
          this.categories = data.result
          return res(this.categories)
        }, err => {
          return rej(err)
        })
    })
  }

  getCategories() {
    return this.categories
  }

  addCategory(item) {
    return new Promise((res, rej) => {
      this._http.post<any>(Api.BASE_URL + "/management" + Api.addCategory, item)
        .subscribe(data => {
          this.categories = data.result
          return res(this.categories)
        }, err => {
          return rej(err)
        })
    })
  }

  updateCategory(item): any {
    return new Promise((res, rej) => {
      this._http.post<any>(Api.BASE_URL + "/management" + Api.updateCategory, item)
        .subscribe(data => {
          this.categories = data.result
          return res(this.categories)
        }, err => {
          return rej(err)
        })
    })
  }

  deleteCategory(item): any {
    return new Promise((res, rej) => {
      this._http.post<any>(Api.BASE_URL + "/management" + Api.deleteCategory, item)
        .subscribe(data => {
          this.categories = data.result
          return res(this.categories)
        }, err => {
          return rej(err)
        })
    })
  }
  getAllCategory() {
    return this._http.get<any>(Api.BASE_URL+"/management"+Api.getAllCategory)
  }

}
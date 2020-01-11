import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Api } from './URL';

@Injectable({
  providedIn: 'root'
})
export class ManagementService {
  currentUserSubject: BehaviorSubject<any>
  currentUser: Observable<any>

  groups = ["BD", "ACTS", "R&D"]
  indents = []

  constructor(
    private _http: HttpClient,
  ) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')))
    this.currentUser = this.currentUserSubject.asObservable()
  }

  public get currentUserValue() {
    return this.currentUserSubject.value
  }

  login(username, password) {
    return this._http.post<any>(Api.BASE_URL + Api.managementLogin, { username: username, password: password })
      .pipe(map(user => {
        if (user) {
          localStorage.setItem('currentUser', JSON.stringify(user))
          this.currentUserSubject.next(user)
        }
        return user
      }))
  }

  logout() {
    localStorage.removeItem('currentUser')
    this.currentUserSubject.next(null)
  }

  getGroups() {
    return this.groups
  }

  setAllIndentNo(callback) {
    this._http.get(Api.BASE_URL + Api.getAllIndentNo)
      .subscribe((data: any) => { 
        this.indents = data.result.map(indent => indent.indent_no) 
        callback(this.indents)
      }, err => { callback([])})
  }

  getAllIndentNo() {
    return this.indents
  }

}
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Api } from './URL';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  Employee = []

  currentEmployeeSubject: BehaviorSubject<any>
  currentEmployee: Observable<any>

  constructor(
    private _http: HttpClient
  ) {
    this.currentEmployeeSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentEmployee')))
    this.currentEmployee = this.currentEmployeeSubject.asObservable()
  }

  public get currentEmployeeValue() {
    return this.currentEmployeeSubject.value
  }

  login(username, password) {
    return this._http.post<any>(Api.BASE_URL + Api.employeeLogin, { username: username, password: password })
      .pipe(map(user => {
        if (user) {
          localStorage.setItem('currentEmployee', JSON.stringify(user))
          this.currentEmployeeSubject.next(user)
        }
        return user
      }))
  }

  logout() {
    localStorage.removeItem('currentEmployee')
    this.currentEmployeeSubject.next(null)
  }

  changePassword(value) {
    value["username"] = this.currentEmployeeValue.username
    return new Promise((res, rej) => {
      this._http.post<any>(Api.BASE_URL + Api.employeeChangePassword, value)
        .subscribe(data => {
          let emp = JSON.parse(localStorage.getItem('currentEmployee'))
          emp.flag = true
          this.currentEmployeeSubject.next(emp)
          res(data.id)
        }, err => {
          rej(err)
        })
    })
  }

  addIndent(item) {
    return this._http.post<any>(Api.BASE_URL + Api.addIndent, item)
  }

  updateIndent(item) {
    return this._http.post<any>(Api.BASE_URL + Api.updateIndent, item)
  }

  submitIndent(item) {
    return this._http.post<any>(Api.BASE_URL + Api.submitIndent, item)
  }

  deleteIndent(item) {
    return this._http.post<any>(Api.BASE_URL + Api.deleteIndent, item)
  }

  getIndentByEmployeeId(employee_id) {
    return this._http.post<any>(Api.BASE_URL + Api.getIndentByEmployeeId, { employee_id })
  }

  setEmployee() {
    return new Promise((res, rej) => {
      this._http.get<any>(Api.BASE_URL + "/management" + Api.getAllEmployee)
        .subscribe(data => {
          this.Employee = data.result
          res(data.result)
        }, err => {
          rej(err)
        })
    })
  }

  getEmployee() {
    return this.Employee
  }

  addEmployee(item) {
    return new Promise((res, rej) => {
      this._http.post<any>(Api.BASE_URL + "/management" + Api.addEmployee, item)
        .subscribe(data => {
          this.Employee = data.result
          return res(true)
        }, err => {
          return rej(err)
        })
    })
  }

  updateEmployee(item): any {
    return new Promise((res, rej) => {
      this._http.post<any>(Api.BASE_URL + "/management" + Api.updateEmployee, item)
        .subscribe(data => {
          this.Employee = data.result
          return res(true)
        }, err => {
          return rej(err)
        })
    })
  }

  deleteEmployee(item): any {
    console.log(Api.BASE_URL + "/management" + Api.deleteEmployee, item);
    return new Promise((res, rej) => {
      this._http.post<any>(Api.BASE_URL + "/management" + Api.deleteEmployee, item)
        .subscribe(data => {
          this.Employee = data.result
          return res(true)
        }, err => {
          return rej(err)
        })
    })
  }
}

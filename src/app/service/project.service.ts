import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Api } from './URL';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  currentUserSubject: BehaviorSubject<any>
  currentUser: Observable<any>

  Project = []

  constructor(private _http: HttpClient) { }

  setProject() {
    return new Promise<any[]>((res, rej) => {
      this._http.get<any>(Api.BASE_URL + "/management" + Api.getAllProject)
        .subscribe(data => {
          this.Project = data.result
          res(data.result)
        }, err => {
          rej(err)
        })
    })
  }

  getProject() {
    return this.Project
  }

  addProject(item) {
    return new Promise((res, rej) => {
      this._http.post<any>(Api.BASE_URL + "/management" + Api.addProject, item)
        .subscribe(data => {
          this.Project = data.result
          return res(true)
        }, err => {
          return rej(err)
        })
    })
  }

  updateProject(item): any {
    return new Promise((res, rej) => {
      this._http.post<any>(Api.BASE_URL + "/management" + Api.updateProject, item)
        .subscribe(data => {
          this.Project = data.result
          return res(true)
        }, err => {
          return rej(err)
        })
    })
  }

  deleteProject(item): any {
    return new Promise((res, rej) => {
      this._http.post<any>(Api.BASE_URL + "/management" + Api.deleteProject, item)
        .subscribe(data => {
          this.Project = data.result
          return res(true)
        }, err => {
          return rej(err)
        })
    })
  }

}
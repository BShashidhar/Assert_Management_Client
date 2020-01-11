import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Api } from './URL';

@Injectable({
  providedIn: 'root'
})
export class IndentService {

  indents = []

  constructor(
    private _http: HttpClient
  ) { }

  setIndents(key?,value?){
    if(key=="employee_id"){
      return this._http.post<any>(Api.BASE_URL+Api.addIndent,{key: value})
    }
  }
}

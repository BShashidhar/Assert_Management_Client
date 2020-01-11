import { Injectable } from '@angular/core';
import { Api } from './URL';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MrrpoService {

  constructor(
    private _http: HttpClient
  ) { }

  addGrcir(grcir) {
    return this._http.post<any>(Api.BASE_URL+"/management"+Api.addGrcir, grcir)
  }

}

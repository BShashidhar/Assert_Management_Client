import { Injectable } from '@angular/core';
import { Api } from './URL';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(private _http:HttpClient){}

    downloadFile(file:String){
      var body = {filename:file};
      return this._http.post(Api.BASE_URL+ Api.downloadFile,body,{
          responseType : 'blob',
          observe: 'response',
          headers:new HttpHeaders().append('Content-Type','application/json')
      })
    }  

    getAllFileNames() {
      return this._http.get(Api.BASE_URL+Api.getAllFileNames)
    }
}  

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { __values } from 'tslib';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private dataSource = new BehaviorSubject(undefined);
  currentData = this.dataSource.asObservable();

  constructor() { }

  changeData(data: string) {
    this.dataSource.next(data)
  }
}

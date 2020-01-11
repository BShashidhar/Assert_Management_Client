import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { EmployeeService } from './employee.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EGuardService  implements CanActivate {

  constructor(private _employeeService: EmployeeService, private _router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    if(!this._employeeService.currentEmployeeValue){
      this._router.navigate([`/${route.data.role}/login`])
      return false
    }
    return true;
  }
}

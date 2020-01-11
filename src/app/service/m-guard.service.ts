import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ManagementService } from './management.service';

@Injectable({
  providedIn: 'root'
})
export class MGuardService implements CanActivate {

  constructor(private _managementService: ManagementService, private _router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    if(!this._managementService.currentUserValue){
      this._router.navigate([`/${route.data.role}/login`])
      return false
    }
    return true;
  }

}
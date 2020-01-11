import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ManagementService } from 'src/app/service/management.service';

@Component({
  selector: 'app-management-navbar',
  templateUrl: './management-navbar.component.html',
  styleUrls: ['./management-navbar.component.scss']
})
export class ManagementNavbarComponent implements OnInit {
  name: string;

  constructor(
    private _router: Router,
    private _managementService: ManagementService
  ) { }

  ngOnInit() {
    this.name = this._managementService.currentUserValue.username 
   }

  logout() {
    this._managementService.logout()
    this._router.navigate(["/management"])
  }
}

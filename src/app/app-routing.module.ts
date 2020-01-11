import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManagementLoginComponent } from './management/management-login/management-login.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { ManagementHomeComponent } from './management/management-home/management-home.component';
import { ManagementAssetComponent } from './management/management-asset/management-asset.component';
import { ManagementEmployeeComponent } from './management/management-employee/management-employee.component';
import { ManagementReportComponent } from './management/management-report/management-report.component';
import { MGuardService } from './service/m-guard.service';
import { EmployeeLoginComponent } from './employee/employee-login/employee-login.component';
import { EGuardService } from './service/e-guard.service';
import { EmployeeHomeComponent } from './employee/employee-home/employee-home.component';
import { EmployeeIndentComponent } from './employee/employee-indent/employee-indent.component';
import { EmployeeChangePasswordComponent } from './employee/employee-change-password/employee-change-password.component';
import { ManagementFileUploadComponent } from './management/management-file-upload/management-file-upload.component';

const routes: Routes = [
  {
    path: "employee",
    children: [
      { path: "", redirectTo: "login", pathMatch: "full" },
      { path: "login", component: EmployeeLoginComponent },
      { path: "home", component: EmployeeHomeComponent, canActivate: [EGuardService], data: {role: "employee"} },
      { path: "indent", component: EmployeeIndentComponent, canActivate: [EGuardService], data: {role: "employee"} },
      { path: "changepassword", component: EmployeeChangePasswordComponent, canActivate: [EGuardService], data: {role: "employee"}  },
    ]
  },
  { 
    path: "management",
    children: [
      { path: "", redirectTo: "login", pathMatch: "full" },
      { path: "login", component: ManagementLoginComponent },
      { path: "home", component: ManagementHomeComponent, canActivate: [MGuardService], data: {role: 'management'} },
      { path: "asset", component: ManagementAssetComponent, canActivate: [MGuardService], data: {role: 'management'} },
      { path: "employee", component: ManagementEmployeeComponent, canActivate: [MGuardService], data: {role: 'management'} },
      { path: "report", component: ManagementReportComponent, canActivate: [MGuardService], data: {role: 'management'} },
      { path: "fileupload", component: ManagementFileUploadComponent, canActivate: [MGuardService], data: {role: 'management'} },
    ]
  },
  { path: "", redirectTo: "management", pathMatch: "full"},
  { path: "**", component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatepickerModule, BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NotifierModule, NotifierOptions } from 'angular-notifier';
import { Ng2OrderModule } from "ng2-order-pipe";
import { NgxPaginationModule } from "ngx-pagination";
import { FileUploadModule } from 'ng2-file-upload';
//jhansi
import { QRCodeModule } from 'angularx-qrcode';
import { ExportAsModule } from 'ngx-export-as';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ManagementLoginComponent } from './management/management-login/management-login.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { ManagementNavbarComponent } from './management/management-navbar/management-navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { ManagementHomeComponent } from './management/management-home/management-home.component';
import { ManagementAssetComponent } from './management/management-asset/management-asset.component';
import { SubItemFilterPipe } from './shared/pipe/sub-item-filter.pipe';
import { SlackLoaderComponent } from './shared/slack-loader/slack-loader.component';
import { CategoryComponent } from './management/core/category/category.component';
import { SubCategoryComponent } from './management/core/sub-category/sub-category.component';
import { AssetGroupComponent } from './management/core/asset-group/asset-group.component';
import { DivisionComponent } from './management/core/division/division.component';
import { ManagementEmployeeComponent } from './management/management-employee/management-employee.component';
import { DepartmentComponent } from './management/core/department/department.component';
import { DesignationComponent } from './management/core/designation/designation.component';
import { ManagementReportComponent } from './management/management-report/management-report.component';
import { SearchFilterPipe } from './shared/pipe/search-filter.pipe';
import { PeripheralsComponent } from './management/core/peripherals/peripherals.component';
import { EmployeeLoginComponent } from './employee/employee-login/employee-login.component';
import { EmployeeNavbarComponent } from './employee/employee-navbar/employee-navbar.component';
import { EmployeeChangePasswordComponent } from './employee/employee-change-password/employee-change-password.component';
import { EmployeeHomeComponent } from './employee/employee-home/employee-home.component';
import { EmployeeIndentComponent } from './employee/employee-indent/employee-indent.component';
import { PasswordShowHideDirective } from './shared/directive/password-show-hide.directive';
import { ManagementFileUploadComponent } from './management/management-file-upload/management-file-upload.component';
import { ProjectComponent } from './management/core/project/project.component';
import { LocationComponent } from './management/core/location/location.component';
import { VendorComponent } from './management/core/vendor/vendor.component';

const customNotifierOptions: NotifierOptions = {
  position: {
    horizontal: {
      position: 'right',
      distance: 12
    },
    vertical: {
      position: 'top',
      distance: 75,
      gap: 10
    }
  },
  theme: 'material',
  behaviour: {
    autoHide: 5000,
    onClick: 'hide',
    onMouseover: 'pauseAutoHide',
    showDismissButton: true,
    stacking: 4
  },
  animations: {
    enabled: true,
    show: {
      preset: 'slide',
      speed: 300,
      easing: 'ease'
    },
    hide: {
      preset: 'fade',
      speed: 300,
      easing: 'ease',
      offset: 50
    },
    shift: {
      speed: 300,
      easing: 'ease'
    },
    overlap: 150
  }
};
@NgModule({
  declarations: [
    AppComponent,
    ManagementLoginComponent,
    PageNotFoundComponent,
    ManagementNavbarComponent,
    ManagementHomeComponent,
    ManagementAssetComponent,
    ManagementEmployeeComponent,
    SubItemFilterPipe,
    SlackLoaderComponent,
    CategoryComponent,
    SubCategoryComponent,
    AssetGroupComponent,
    DivisionComponent,
    DepartmentComponent,
    DesignationComponent,
    ManagementReportComponent,
    SearchFilterPipe,
    PeripheralsComponent,
    EmployeeLoginComponent,
    EmployeeNavbarComponent,
    EmployeeChangePasswordComponent,
    EmployeeHomeComponent,
    EmployeeIndentComponent,
    PasswordShowHideDirective,
    ManagementFileUploadComponent,
    ProjectComponent,
    LocationComponent,
    VendorComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2OrderModule,
    NgxPaginationModule,
    FileUploadModule,
    DatepickerModule.forRoot(),
    BsDatepickerModule.forRoot(),
    NotifierModule.withConfig(customNotifierOptions),
    QRCodeModule,
    ExportAsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

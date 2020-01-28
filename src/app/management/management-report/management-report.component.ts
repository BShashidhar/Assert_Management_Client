import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AssetService } from 'src/app/service/asset.service';
import { EmployeeService } from 'src/app/service/employee.service';
import { ProjectService } from 'src/app/service/project.service'
import { DataService } from 'src/app/service/data.service';
import { Router } from '@angular/router';
import { AssetPeripheralService } from 'src/app/service/asset-peripheral.service';
import { PeripheralService } from 'src/app/service/peripheral.service';
import { ManagementService } from 'src/app/service/management.service';
import { VendorService } from 'src/app/service/vendor.service';
import { LocationService } from 'src/app/service/location.service';
import { ExportAsService, ExportAsConfig } from 'ngx-export-as';
import { NotifierService } from 'angular-notifier';
import { Api } from 'src/app/service/URL';
import { getDate } from 'ngx-bootstrap/chronos/utils/date-getters';
// import { type } from 'os';

@Component({
  selector: 'app-management-report',
  templateUrl: './management-report.component.html',
  styleUrls: ['./management-report.component.scss']
})

export class ManagementReportComponent implements OnInit {
  assets: any = []
  projects: any = []
  employees: any = []
  groups: any = []
  peripherals: any = []
  assetPeripherals: any = []
  vendors: any = []
  locations: any = []
  assetPeripheralList: any = {}
  isOpenPeripheralsByAsset: boolean = false

  year: Number = null
  employee: string = null
  group: string = null
  public QrCode: string = null


  listOfYears = []
  listOfEmployee = []
  listOfGroups = []

  isLoading: boolean = false
  yearPrint: boolean = false
  employeePrint: boolean = false
  groupPrint: boolean = false
  encData: string = null;
  id: string = null;
  Openhide: boolean = false;
  config: ExportAsConfig;

  private _notifier: NotifierService

  constructor(
    private _title: Title,
    private _assetService: AssetService,
    private _projectService: ProjectService,
    private _employeeService: EmployeeService,
    private _managementService: ManagementService,
    private _vendorService: VendorService,
    private _locationService: LocationService,
    private _peripheral: PeripheralService,
    private _assetPeripheralService: AssetPeripheralService,
    private _dataService: DataService,
    private _router: Router,
    private exportAsService: ExportAsService,
    private notifier: NotifierService
  ) {
    this._title.setTitle("Report")
    notifier = this._notifier
  }

  ngOnInit() {
    this.Init();
  }
  Init() {
    Promise.all([
    this._peripheral.setPeripherals(),
    this._employeeService.setEmployee(),
    this._vendorService.setVendor(),
    this._locationService.setLocation(),
    this._projectService.setProject()])
      .then(values => {
        this.peripherals = values[0]
        this.employees = values[1]
        this.vendors = values[2]
        this.locations = values[3]
        this.projects = values[4]
        this.groups = this._managementService.getGroups()
      })
    this._assetService.getAllAsset()
      .subscribe((data: any) => {
        data.result.forEach(item => {
          this.employees.forEach(emp => {
            if (item.employee_id == emp.id) {
              item["employee_name"] = emp.name
            }
          })
          this.vendors.forEach(ven => {
            if (item.vendor_id == ven.id) {
              item["vendor_name"] = ven.name
            }
          })
          this.locations.forEach(loc => {
            if (item.location_id == loc.id) {
              item["location_name"] = loc.name
            }
          })
          this.projects.forEach(proj => {
            if (item.project_id == proj.id) {
              item["project_name"] = proj.name
            }
          })
          this.assets.push(item)
        })
      }, err => {
      })
  }

  editAsset(asset) {
    this._dataService.changeData(asset)
    this._router.navigate(['/management/asset'])
  }

  maxItem = [10, 20, 30, 40, 50]
  p: number = 1
  items: number = 10

  onMaxItemChange(items) {
    this.items = items
  }

  key: string = 'id' //set default
  previousKey: string = ''
  reverse: boolean = false
  sort(key) {
    this.previousKey = this.key
    this.key = key
    if (this.previousKey === this.key)
      this.reverse = !this.reverse
  }

  genQrcode(a) {
    this.Openhide = true
    this.id = a.asset_id;
    var date = new Date(a.acquired_date);
    var dd=date.getDate();
    var mm=date.getMonth()+1;
    var yyyy=date.getFullYear();
    var full = a.warrenty / 1;
    var warrentyYear = full + yyyy;
    var remain = a.warrenty % 1;
    var warrentyMonth = mm
    if(  remain!=0 ){      
    }
    var warrenty = (dd-1) +'/'+warrentyMonth+'/'+warrentyYear;
    var acquired_date =dd+'/'+mm+'/'+yyyy;
    this._assetService.getAssatById(a.id)
      .subscribe(data => {
        console.log(data)
      }, err => {
        console.log
      })
    this.encData = "\n\n{" +
      "\n" + JSON.stringify("assetID") + ":" + JSON.stringify(a.asset_id) + "," +
      "\n" + JSON.stringify("warrenty") + ":" + JSON.stringify(warrenty) + "," +
      "\n" + JSON.stringify("invoiceDate") + ":" + JSON.stringify(acquired_date) + "," +
      "\n" + JSON.stringify("supplier") + ":" + JSON.stringify(a.vendor_name) + "," +
      "\n" + JSON.stringify("value") + ":" + JSON.stringify(a.price) + "," +
      "\n" + JSON.stringify("project") + ":" + JSON.stringify(a.project_name) + "," +
      "\n" + JSON.stringify("issuedTo") + ":" + JSON.stringify(a.username) + "," +
      "\n" + JSON.stringify("usedBy") + ":" + JSON.stringify(a.employee_name) +
      "\n}"
    this.QrCode = this.encData;
  }

  exportAsConfig: ExportAsConfig = {
    type: 'png',
    elementId: 'QRCode'
  }
  png() {
    this.exportAsService.save(this.exportAsConfig, this.id).subscribe(() => {
    });
    this.exportAsService.get(this.config).subscribe(content => {
      console.log(content);
    });
  }

  showPeripherals(asset) {
    this._assetPeripheralService.getPeripheralByAsset(asset.id)
      .subscribe(data => {
        if (data && data.result) {
          this.assetPeripheralList["asset_id"] = asset.asset_id
          this.assetPeripheralList["peripheral"] = []
          data.result.forEach(peri => {
            this.peripherals.forEach(p => {
              if (p.id == peri.peripherals_id) {
                var value = {
                  name: p.name,
                  serial_no: peri.serial_no,
                  key: peri.asset_peripheral_id
                }
                this.assetPeripheralList["peripheral"].push(value)
              }
            })
          })
          this.isOpenPeripheralsByAsset = true
        }
      }, err => {
        console.log("error = ", err);
      })
  }

  print(value) {
    this.listOfYears = []
    this.listOfEmployee = []
    this.listOfGroups = []

    this.yearPrint = (value == 'yearPrint') ? true : false
    this.employeePrint = (value == 'employeePrint') ? true : false
    this.groupPrint = (value == 'groupPrint') ? true : false
    new Promise((res, rej) => {
      if (this.yearPrint) {
        if (!this.year) rej("year")
        this.assets.forEach(asset => {
          if (asset.asset_id.includes('CDACB/' + this.year)) {
            this.listOfYears.push(asset)
          }
        })
      }

      if (this.employeePrint) {
        if (!this.employee) rej("employee")
        this.assetPeripherals = []
        this.assets.forEach(asset => {
          if (asset.employee_id == this.employee) {
            this.listOfEmployee.push(asset)
            this._assetPeripheralService.getPeripheralByAsset(asset.id)
              .subscribe(data => {
                this.assetPeripherals = data.result
              }, err => {
            })
          }
        })
      }


      if (this.groupPrint) {
        if (!this.group) rej("group")
        this.assets.forEach(asset => {
          if (asset.group == this.group) {
            this.listOfGroups.push(asset)
          }
        })
      }
      res(true)
    }).then(() => {
      setTimeout(() => {
        window.print()
      }, 888)
    }).catch(err => {

    })
  }
  showAssetDetails(a){
    alert("hello world")
    this._assetService.getAssatById(a.asset_details)
  }


  // delete(asset) {
  //   this.isLoading = true
  //   let aid = { id: asset.id }
  //   new Promise((res, rej) => {
  //     this._assetService.deleteAsset(aid)
  //       .subscribe(data => {
  //         this.assets = data
  //         res()
  //       }, err => {
  //         console.log(err)
  //       })
  //   })
  //     .then(isDeleted => {
  //       this.isLoading = false
  //       // this._notifier.notify("success", "Asset deleted successfully..!!")
  //     })
  //     .catch(err => {
  //       this.isLoading = false
  //       // this._notifier.notify("error", "Asset not deleted. Please try again..!!")
  //     })
  // }

}

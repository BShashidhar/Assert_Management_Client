import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AssetService } from 'src/app/service/asset.service';
import { EmployeeService } from 'src/app/service/employee.service';
import { DataService } from 'src/app/service/data.service';
import { Router } from '@angular/router';
import { AssetPeripheralService } from 'src/app/service/asset-peripheral.service';
import { PeripheralService } from 'src/app/service/peripheral.service';
import { ManagementService } from 'src/app/service/management.service';
import { ExportAsService } from 'ngx-export-as';
let ManagementReportComponent = class ManagementReportComponent {
    constructor(_title, _assetService, _employeeService, _managementService, _peripheral, _assetPeripheralService, _dataService, _router, exportAsService) {
        this._title = _title;
        this._assetService = _assetService;
        this._employeeService = _employeeService;
        this._managementService = _managementService;
        this._peripheral = _peripheral;
        this._assetPeripheralService = _assetPeripheralService;
        this._dataService = _dataService;
        this._router = _router;
        this.exportAsService = exportAsService;
        this.assets = [];
        this.employees = [];
        this.groups = [];
        this.peripherals = [];
        this.assetPeripherals = [];
        this.assetPeripheralList = {};
        this.isOpenPeripheralsByAsset = false;
        this.year = null;
        this.employee = null;
        this.group = null;
        this.QrCode = null;
        this.listOfYears = [];
        this.listOfEmployee = [];
        this.listOfGroups = [];
        this.isLoading = false;
        this.yearPrint = false;
        this.employeePrint = false;
        this.groupPrint = false;
        this.encData = null;
        this.id = null;
        this.Openhide = false;
        this.maxItem = [5, 10, 25, 50, 100];
        this.p = 1;
        this.items = 5;
        this.key = 'id'; //set default
        this.previousKey = '';
        this.reverse = false;
        this.exportAsConfig = {
            type: 'png',
            elementId: 'QRCode'
        };
        this._title.setTitle("Report");
    }
    ngOnInit() {
        this.Init();
    }
    Init() {
        Promise.all([this._peripheral.setPeripherals(), this._employeeService.setEmployee()])
            .then(values => {
            this.peripherals = values[0];
            this.employees = values[1];
            this.groups = this._managementService.getGroups();
        });
        this._assetService.getAllAsset()
            .subscribe((data) => {
            data.result.forEach(item => {
                this.employees.forEach(emp => {
                    if (item.employee_id == emp.id) {
                        item["employee_name"] = emp.name;
                        this.assets.push(item);
                    }
                });
            });
        }, err => {
        });
    }
    editAsset(asset) {
        this._dataService.changeData(asset);
        this._router.navigate(['/management/asset']);
    }
    onMaxItemChange(items) {
        this.items = items;
    }
    sort(key) {
        this.previousKey = this.key;
        this.key = key;
        if (this.previousKey === this.key)
            this.reverse = !this.reverse;
    }
    genQrcode(a) {
        this.Openhide = true;
        this.id = a.asset_id;
        this.encData = "\n192.9.200.195:4200/management/asset?" + a.id +
            "\n\nAsset ID: " + a.asset_id +
            "\nEmp Name: " + a.employee_name +
            "\nUser Name: " + a.username +
            "\nGRCIR No: " + a.grcir_no +
            "\nPO No: " + a.po_no +
            "\nProject: " + a.project_id +
            "\nAsset Details: " + a.asset_details;
        this.QrCode = this.encData;
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
                this.assetPeripheralList["asset_id"] = asset.asset_id;
                this.assetPeripheralList["peripheral"] = [];
                data.result.forEach(peri => {
                    this.peripherals.forEach(p => {
                        if (p.id == peri.peripherals_id) {
                            var value = {
                                name: p.name,
                                serial_no: peri.serial_no,
                                key: peri.asset_peripheral_id
                            };
                            this.assetPeripheralList["peripheral"].push(value);
                        }
                    });
                });
                this.isOpenPeripheralsByAsset = true;
            }
        }, err => {
            console.log("error = ", err);
        });
    }
    print(value) {
        this.listOfYears = [];
        this.listOfEmployee = [];
        this.listOfGroups = [];
        this.yearPrint = (value == 'yearPrint') ? true : false;
        this.employeePrint = (value == 'employeePrint') ? true : false;
        this.groupPrint = (value == 'groupPrint') ? true : false;
        new Promise((res, rej) => {
            if (this.yearPrint) {
                if (!this.year)
                    rej("year");
                this.assets.forEach(asset => {
                    if (asset.asset_id.includes('CDACB/' + this.year)) {
                        this.listOfYears.push(asset);
                    }
                });
            }
            if (this.employeePrint) {
                if (!this.employee)
                    rej("employee");
                this.assetPeripherals = [];
                this.assets.forEach(asset => {
                    if (asset.employee_id == this.employee) {
                        this.listOfEmployee.push(asset);
                        this._assetPeripheralService.getPeripheralByAsset(asset.id)
                            .subscribe(data => {
                            this.assetPeripherals = data.result;
                        }, err => {
                            //notifier add 
                            //notifier add 
                            //notifier add 
                            //notifier add 
                            //notifier add 
                            //notifier add 
                            //notifier add 
                        });
                        alert(JSON.stringify(asset));
                    }
                });
            }
            if (this.groupPrint) {
                if (!this.group)
                    rej("group");
                this.assets.forEach(asset => {
                    if (asset.group == this.group) {
                        this.listOfGroups.push(asset);
                    }
                });
            }
            res(true);
        }).then(() => {
            setTimeout(() => {
                window.print();
            }, 888);
        }).catch(err => {
        });
    }
};
ManagementReportComponent = tslib_1.__decorate([
    Component({
        selector: 'app-management-report',
        templateUrl: './management-report.component.html',
        styleUrls: ['./management-report.component.scss']
    }),
    tslib_1.__metadata("design:paramtypes", [Title,
        AssetService,
        EmployeeService,
        ManagementService,
        PeripheralService,
        AssetPeripheralService,
        DataService,
        Router,
        ExportAsService])
], ManagementReportComponent);
export { ManagementReportComponent };
//# sourceMappingURL=management-report.component.js.map
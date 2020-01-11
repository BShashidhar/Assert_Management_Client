import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FileUploader } from 'ng2-file-upload';
import { Api } from 'src/app/service/URL';
import { NotifierService } from 'angular-notifier';
import { FileUploadService } from 'src/app/service/file-upload.service';
import { MrrpoService } from 'src/app/service/mrrpo.service';
let ManagementFileUploadComponent = class ManagementFileUploadComponent {
    constructor(fb, notifier, _fileUploadService, _MrrpoService) {
        this.fb = fb;
        this.notifier = notifier;
        this._fileUploadService = _fileUploadService;
        this._MrrpoService = _MrrpoService;
        this.uploader = new FileUploader({ url: Api.BASE_URL + Api.uploadFile });
        this.fileNameList = [];
        this.nameList = [];
        this.lastkeydown = 0;
        this.isLoading = false;
        this.isSubmitted = false;
        this.submitted = false;
        this.saved = false;
        this.grcirFDateValue = null;
        this.poFDateValue = null;
        this.billFDateValue = null;
        this._notifier = this.notifier;
        this.uploader.onCompleteItem = (item, response, status, headers) => {
            this.response = JSON.parse(response);
            if (!this.response.status) {
                let arr = this.response.error.path.split('\\');
                let file = arr[arr.length - 1];
                this._notifier.notify('error', `${file} is not uploaded`);
            }
            else {
                this._notifier.notify('success', `${this.response.originalname} is uploaded successfull`);
            }
        };
        this.grcirForm = this.fb.group({
            assetF_id: ['', Validators.required],
            grcirF_no: ['', Validators.required],
            grcirF_date: [''],
            poF_no: ['', Validators.required],
            poF_date: [''],
            billF_no: ['', Validators.required],
            billF_date: [''],
            supplier: ['', Validators.required],
            description: ['', Validators.required],
            quantity: ['0'],
            received: ['0'],
            accepted: ['0'],
            rate: ['0'],
            val: ['0'],
        });
    }
    ngOnInit() {
        this.getAllFileNames();
        this.uploader.onAfterAddingFile = file => file.withCredentials = false;
        this.uploader.onBeforeUploadItem = item => {
            item.alias = "file",
                item.headers = [{ 'Content-Type': 'multipart/form-data' }];
        };
        this.isSubmitted = false;
    }
    get f() { return this.grcirForm.controls; }
    addGrcirF() {
        this.submitted = true;
        this.saved = true;
        if (this.grcirForm.invalid)
            return;
        let grcirForm = {
            assetF_id: this.grcirForm.controls.assetF_id.value,
            grcirF_no: this.grcirForm.controls.grcirF_no.value,
            grcirF_date: this.grcirForm.controls.grcirF_date.value,
            poF_no: this.grcirForm.controls.poF_no.value,
            poF_date: this.grcirForm.controls.poF_date.value,
            billF_no: this.grcirForm.controls.billF_no.value,
            billF_date: this.grcirForm.controls.billF_date.value,
            supplier: this.grcirForm.controls.supplier.value,
            description: this.grcirForm.controls.description.value,
            quantity: this.grcirForm.controls.quantity.value,
            received: this.grcirForm.controls.received.value,
            accepted: this.grcirForm.controls.accepted.value,
            rate: this.grcirForm.controls.rate.value,
            val: this.grcirForm.controls.val.value
        };
        new Promise((res, rej) => {
            this.isLoading = true;
            this._MrrpoService.addGrcir(grcirForm)
                .subscribe(data => {
                res(data.result);
            }, err => {
                rej(err);
            });
        })
            .then(result => {
            this.isLoading = false;
            this._notifier.notify("success", "Added MRR/PO record Successfully..!!");
            this.grcirForm.reset();
        }).catch(err => {
            this.isLoading = false;
            this._notifier.notify("error", "Problem in record entry. Try again..!!");
        });
    }
    calculateValue() {
        this.res = (this.grcirForm.controls.rate.value) * (this.grcirForm.controls.accepted.value);
        this.grcirForm.get('val').setValue(this.res);
    }
    getAllFileNames() {
        this._fileUploadService.getAllFileNames()
            .subscribe(names => {
            this.fileNameList = Object.assign([], names);
            //console.log(this.fileNameList)
        });
    }
    getAutoCompleteList($event) {
        this.nameList = [];
        if (this.filename.length > 2) {
            if ($event.timeStamp - this.lastkeydown > 200) {
                this.nameList = this.searchFromArray(this.fileNameList, this.filename);
            }
        }
    }
    searchFromArray(arr, value) {
        let matches = [];
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].toLowerCase().match(value.toLowerCase())) {
                matches.push(arr[i]);
            }
        }
        return matches;
    }
    download() {
        this.isSubmitted = true;
        var filename = this.filename;
        if (!filename)
            return;
        this.isLoading = true;
        this._fileUploadService.downloadFile(filename)
            .subscribe(data => {
            this.isLoading = false;
            var blobUrl = window.URL.createObjectURL(data.body);
            const tempLink = document.createElement('a');
            tempLink.style.display = 'none';
            tempLink.href = blobUrl;
            tempLink.setAttribute('download', filename);
            if (typeof tempLink.download === undefined) {
                tempLink.setAttribute('target', '_blank');
            }
            document.body.appendChild(tempLink);
            tempLink.click();
            document.body.removeChild(tempLink);
            setTimeout(() => {
                window.URL.revokeObjectURL(blobUrl);
            }, 100);
        }, error => {
            this.isLoading = false;
            this._notifier.notify('error', 'File not found or file download problem...!!');
        });
    }
};
ManagementFileUploadComponent = tslib_1.__decorate([
    Component({
        selector: 'app-management-file-upload',
        templateUrl: './management-file-upload.component.html',
        styleUrls: ['./management-file-upload.component.scss']
    }),
    tslib_1.__metadata("design:paramtypes", [FormBuilder,
        NotifierService,
        FileUploadService,
        MrrpoService])
], ManagementFileUploadComponent);
export { ManagementFileUploadComponent };
//# sourceMappingURL=management-file-upload.component.js.map
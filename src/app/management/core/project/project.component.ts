import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProjectService } from 'src/app/service/project.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {
  
  projectForm: FormGroup

  projects: any = []

  isSubmitted: boolean = false
  isLoading: boolean = false
  isEditted: boolean = false

  selectedProject

  successmsg: String = ''
  errormsg: String = ''

  constructor(
    private _fb: FormBuilder,
    private _projectService: ProjectService
  ) {
    this.projectForm = this._fb.group({
      project: ['', Validators.required]
    })
    this._projectService.setProject().then(value => this.projects = value)
   }

  ngOnInit() {
    this.projects = this._projectService.getProject()
  }

  public get f() {
    return this.projectForm.controls
  }

  save() {
    this.isSubmitted = true
    this.successmsg = this.errormsg = ''
    if (this.projectForm.invalid) return
    this.isLoading = true
    if (this.isEditted) {
      let item = {
        project_id: this.selectedProject.id,
        project_name: this.projectForm.controls.project.value
      }
      new Promise((res, rej) => { res(this._projectService.updateProject(item)) })
        .then((isUpdated) => {
          this.successmsg = "Update successfull..!!"
          this.projects = this._projectService.getProject()
          this.isLoading = this.isEditted = false
        })
        .catch(err => {
          this.errormsg = "Update fail..!!"
          this.isLoading = this.isEditted = false
        })
    } else {
      let project_name = this.projectForm.controls.project.value
      new Promise((res, rej) => { res(this._projectService.addProject({ project_name })) })
        .then(isAdded => {
          this.successmsg = "Save successfull..!!"
          this.projects = this._projectService.getProject();
          this.isLoading = false
        })
        .catch(err => {
          this.errormsg = "Save fail. Try again..!!"
          this.isLoading = false
        })
    }
    this.isSubmitted = false
    this.projectForm.reset()
  }

  edit(item) {
    this.successmsg = this.errormsg = ''
    this.projectForm.patchValue({
      project: item.name
    })
    this.isEditted = true
    this.selectedProject = item
  }

  delete(item) {
    this.successmsg = this.errormsg = ''
    this.isLoading = true
    let project_id = item.id
    new Promise((res, rej) => { res(this._projectService.deleteProject({ project_id })) })
      .then(isDeleted => {
        this.successmsg = "Delete successfull..!!"
        this.projects = this._projectService.getProject();
        this.isLoading = false
      })
      .catch(err => {
        this.errormsg = "Delete fail. Try again..!!"
        this.isLoading = false
      })
  }

}

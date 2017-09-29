import { Component, OnInit, ViewChild } from '@angular/core';
import {BrowserModule, DomSanitizer} from '@angular/platform-browser'
import { Project } from '../../models/project.model';
import { Subscription } from "rxjs/Subscription";
import { ProjectServiceService } from "../../core/project-service/project-service.service";
import { Router, ActivatedRoute } from "@angular/router";
import { Observable } from 'rxjs/Observable';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../core/auth-service/auth-service.service';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-projects-edit',
  templateUrl: './projects-edit.component.html',
  styleUrls: ['./projects-edit.component.css']
})
export class ProjectsEditComponent implements OnInit {

  public project: Project;
  public projects: Project[];
  public projectId: any;
  private editable: boolean = false;
  private base64Image: string = '';

changeListener($event): void {
   this.readThis($event.target);
 }

 readThis(inputValue: any): void {
   var file: File = inputValue.files[0];
   var myReader: FileReader = new FileReader();

   myReader.onloadend = (e) => {
     this.base64Image = myReader.result;
   }
   myReader.readAsDataURL(file);
 }

  deleteProject() {
    this.projectData.deleteProject(this.projectId.id).subscribe();
    this.router.navigate(['/admin/projects']);
    this.projectData.look.next('check');
  }

  cancelChanges() {
    this.editable = false;
  }

  editProject() {
    this.editable = true;
  }

  approveProject() {
    this.projectData.putProject(this.projectId.id, { "approved": true, "status": "active" }).subscribe(
      (response) => {
        this.project.approved = response.approved;
        this.project.status = response.status;
      }
    );
    this.projectData.look.next('change');
  }

  closeProject() {
    this.projectData.putProject(this.projectId.id, { "status": "closed" }).subscribe();
    this.router.navigate(['/admin/projects/']);
    this.projectData.look.next('change');
  }

  saveChanges(form: NgForm) {
    const value = form.value;

    let project: Project = {
      projectName: value.projectName,
      image: this.base64Image || this.project.image,
      desc: value.desc,
      goals: value.goals,
      result: value.result,
      budget: value.budget
    }

    this.projectData.putProject(this.projectId.id, project)
      .subscribe(
      (response) => {
        this.project = response;
        this.editable = false;
        this.projectData.look.next('check');
      });
  }

  constructor(private route: ActivatedRoute,
    private router: Router,
    private projectData: ProjectServiceService,
    private sanitizer: DomSanitizer) {

    let httpResult = route.params.switchMap(param => {
      this.projectId = param;
      return this.projectData.getProject(this.projectId.id);
    });

    httpResult.subscribe(
      (response) => {
        this.project = response;
      });
  }

  ngOnInit(): void {

  }

}


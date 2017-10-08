import { Component, OnInit, ViewChild } from '@angular/core';
import {BrowserModule, DomSanitizer} from '@angular/platform-browser'
import { Project } from '../../models/project.model';
import { Subscription } from "rxjs/Subscription";
import { ProjectServiceService } from "../../core/project-service/project-service.service";
import { Router, ActivatedRoute } from "@angular/router";
import { Observable } from 'rxjs/Observable';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../core/auth-service/auth-service.service';
import { ImageServiceService } from '../../core/image-service/image-service.service';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-projects-edit',
  templateUrl: './projects-edit.component.html',
  styleUrls: ['./projects-edit.component.css']
})
export class ProjectsEditComponent implements OnInit {

  public project: Project;
  private projects: Project[];
  public projectId: any;
  public editable: boolean = false;
  private imageFire: string = '';
  public image: string = '';
  public likes: number;
  
  deleteProject() {
    this.projectData.deleteProject(this.projectId.id).subscribe();
    this.router.navigate(['/admin/projects']);
    this.projectData.look.next('check');
  }

  pushImage() {
    this.imageService.uploadFile(event)
    .subscribe(res => {},
    (error) => {
      console.error(error);
    });
  }

  cancelChanges() {
    this.editable = false;
    this.imageService.resetImage();
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
    this.imageFire = this.imageService.fileName;

    let project: Project = {
      projectName: value.projectName,
      image: this.imageFire || this.image,
      desc: value.desc,
      goals: value.goals,
      result: value.result,
      budget: value.budget
    }
    console.log(this.imageFire);

    this.projectData.putProject(this.projectId.id, project)
      .subscribe(
      (response) => {
        this.project = response;
        this.image = response.image;
        this.editable = false;
        this.projectData.look.next('check');
      });

      this.imageService.resetImage();
  }

  constructor(private route: ActivatedRoute,
    private router: Router,
    private projectData: ProjectServiceService,
    private imageService: ImageServiceService) {

    let httpResult = route.params.switchMap(param => {
      this.projectId = param;
      return this.projectData.getProject(this.projectId.id);
    });

    httpResult.subscribe(
      (response) => {
        this.project = response;
        this.image = response.image;
      });
  }

  ngOnInit(): void {
    this.imageService.resetImage();
   }

}


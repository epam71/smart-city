import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectServiceService } from '../../core/project-service/project-service.service';
import { Router } from '@angular/router';
import { Project } from '../../models/project.model';
import { AuthService } from '../../core/auth-service/auth-service.service';
import { NgForm } from '@angular/forms';
import { ImageServiceService } from '../../core/image-service/image-service.service';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/forkJoin'
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.css']
})
export class ProjectEditComponent implements OnInit {

  @ViewChild('f') slForm: NgForm;

  imageFire = '';

  editMode;
  project;
  image = '';
  tempId;
  errorMessage;

  progressBar;

  constructor(private route: ActivatedRoute,
    private putProject: ProjectServiceService,
    private authService: AuthService,
    private imageService: ImageServiceService,
    private router: Router) {
    route.params.subscribe(param => {
      this.tempId = param;
    });
  }

  pushImage() {
    this.imageService.uploadFile(event);
  }

  actProject(form: NgForm) {

    this.imageFire = this.imageService.fileName;
    const value = form.value;
    value.budget = value.budget || 0;

    let projectEdit: Project = {
      projectName: value.projectName.charAt(0).toUpperCase() + value.projectName.slice(1),
      image: this.imageFire || this.image,
      desc: value.desc,
      goals: value.goals,
      result: value.result,
      budget: value.budget,
      approved: false,
      status: 'edited'
    }



    let projectTemp: Project = Object.assign({
      author: this.authService.getNickname(),
      authorEmail: this.authService.getEmail(),
      image: this.imageFire,
      status: 'new',
    }, projectEdit);

    if (this.tempId.id == null) {
      this.putProject.postProject(projectTemp)
        .subscribe(
        (response) => {

          this.putProject.message = 'new';
          this.router.navigate(['/projects/' + response._id]);
        },
        (error) => {
          console.error(error);
          this.errorMessage = error;
        });
    } else {
      this.putProject.putProject(this.tempId.id, projectEdit)
        .subscribe(
        (response) => {

          this.putProject.message = 'edit';
          this.router.navigate(['/projects/' + this.tempId.id]);
        },
        (error) => {
          console.error(error);
          this.errorMessage = error;
        });
    }
  }

  clearForm() {
    this.slForm.reset();
    this.editMode = false;
  }

  ngOnInit() {

    this.imageService.reload();

    if (this.tempId.id != null) {
      this.editMode = true;
      this.putProject.getProject(this.tempId.id)
        .subscribe(
        (response) => {
          this.project = response;
          this.image = response.image;
        },
        (error) => {
          console.error(error);
        });
    }
  }

}
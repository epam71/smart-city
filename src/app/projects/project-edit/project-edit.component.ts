import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectServiceService } from '../../core/project-service/project-service.service';
import { Router } from '@angular/router';
import { Project } from '../models/project.model';
import { AuthService } from '../../core/auth-service/auth-service.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.css']
})
export class ProjectEditComponent implements OnInit {

  @ViewChild('f') slForm: NgForm;

  editMode;
  project;
  tempId;
  errorMessage;

  constructor(private route: ActivatedRoute,
    private putProject: ProjectServiceService,
    private authService: AuthService,
    private router: Router) {
    route.params.subscribe(param => {
      this.tempId = param;
    });
  }

  actProject(form: NgForm) {
    const value = form.value;
    value.budget = value.budget || 0;

    let project: any = {
      projectName: value.projectName, 
      image: value.image,
      desc: value.desc, 
      goals: value.goals, 
      result: value.result, 
      budget: value.budget
    }

    if (this.tempId.id == null) {
      this.putProject.postProject(project)
        .subscribe(
        (response) => {
          this.router.navigate(['/projects']);
        },
        (error) => {
          this.errorMessage = error;
        });
    } else {
      this.putProject.patchProject(this.tempId.id, project)
        .subscribe(
        (response) => {
          this.router.navigate(['/projects/' + this.tempId.id]);
        },
        (error) => {
          this.errorMessage = error;
        });
    }
  }

  test(){
    this.slForm.reset();
    this.editMode = false;
  }

  ngOnInit() {
    if (this.tempId.id != null) {
      this.editMode = true;
      this.project = this.putProject.getProject(this.tempId.id);
    }
  }

}

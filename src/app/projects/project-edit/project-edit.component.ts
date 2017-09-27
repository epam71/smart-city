import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectServiceService } from '../../core/project-service/project-service.service';
import { Router } from '@angular/router';
import { Project } from '../../models/project.model';
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
  image = '';
  tempId;
  errorMessage;
  base64textString: string = '';

  constructor(private route: ActivatedRoute,
    private putProject: ProjectServiceService,
    private authService: AuthService,
    private router: Router) {
    route.params.subscribe(param => {
      this.tempId = param;
    });
  }

 fileSelect(event){
  this.readThis(event.target);
  }
  
  readThis(inputValue: any): void {
    var file: File = inputValue.files[0];
    var myReader: FileReader = new FileReader();

    myReader.onloadend = (e) => {
      this.base64textString = myReader.result;
    }
    myReader.readAsDataURL(file);
  }

  actProject(form: NgForm) {
    const value = form.value;
    value.budget = value.budget || 0;

    let projectEdit: Project = {
      projectName: value.projectName.charAt(0).toUpperCase() + value.projectName.slice(1),
      image: this.base64textString || this.image,
      desc: value.desc,
      goals: value.goals,
      result: value.result,
      budget: value.budget,
      status: 'edited'
    }

    let projectTemp: Project = Object.assign({
      author: this.authService.getNickname(),
      authorEmail: this.authService.getEmail(),
      image: this.base64textString,
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
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

  handleFileSelect(evt){
      var files = evt.target.files;
      var file = files[0];
    
    if (files && file) {
        var reader = new FileReader();
        reader.onload =this._handleReaderLoaded.bind(this);
        reader.readAsBinaryString(file);
    }
  }
  
  _handleReaderLoaded(readerEvt) {
     var binaryString = readerEvt.target.result;
            this.base64textString = btoa(binaryString);
    }

  actProject(form: NgForm) {
    const value = form.value;
    value.budget = value.budget || 0;

    let projectEdit: Project = {
      projectName: value.projectName.charAt(0).toUpperCase() + value.projectName.slice(1),
      image: this.base64textString,
      desc: value.desc,
      goals: value.goals,
      result: value.result,
      budget: value.budget,
      status: 'edited'
    }

    let projectTemp: Project = Object.assign({
      author: this.authService.getNickname(),
      authorEmail: this.authService.getEmail(),
      status: 'new',
    }, projectEdit);

    if (this.tempId.id == null) {
      this.putProject.postProject(projectTemp)
        .subscribe(
        (response) => {
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
        },
        (error) => {
          console.error(error);
        });
    }
  }

}
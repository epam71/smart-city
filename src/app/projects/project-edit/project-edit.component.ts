import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectServiceService } from '../../core/project-service/project-service.service';
import { Router } from '@angular/router';
import { Project } from '../../models/project.model';
import { AuthService } from '../../core/auth-service/auth-service.service';
import { NgForm, Validators, FormGroup, FormControl } from '@angular/forms';
import { ImageServiceService } from '../../core/image-service/image-service.service';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/forkJoin'
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.css']
})
export class ProjectEditComponent implements OnInit, OnDestroy {

  imageFire = '';
  imageFireKey = '';

  private prForm: FormGroup;
  private desc: string = '';
  private projectName: string = '';

  editMode;
  project;
  image = '';
  imageKey = '';
  tempId;
  errorMessage;

  done: string = '';
  progressBar;

  constructor(private route: ActivatedRoute,
    private putProject: ProjectServiceService,
    private authService: AuthService,
    public imageService: ImageServiceService,
    private router: Router) {
    this.prForm = new FormGroup({
      'projectName': new FormControl(null, [Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(30)])]),
      'desc': new FormControl(null, [Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(2500)])]),
      'goals': new FormControl(null),
      'result': new FormControl(null),
      'budget': new FormControl(null)
    });
    route.params.subscribe(param => {
      this.tempId = param;
    });
  }



  pushImage(event) {

    this.imageService.uploadFile(event)
      .subscribe(res => {
        this.imageFire = this.imageService.fileName;
        this.imageFireKey = this.imageService.imageKey;
        this.done = 'added';
      },
      (error) => {
        console.error(error);
        this.errorMessage = error;
      });
  }

  actProject() {

    const value = this.prForm.value;
    value.budget = value.budget || 0;
    this.done = 'done';

    let projectEdit: Project = {
      projectName: value.projectName.charAt(0).toUpperCase() + value.projectName.slice(1),
      image: this.imageFire || this.image,
      imageKey: this.imageFireKey || this.imageKey,
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
      imageKey: this.imageFireKey,
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
    this.prForm.reset();
    this.editMode = false;
    if (this.imageFireKey !== '') {
      this.imageService.resetImage();
      this.imageService.deleteImage(this.imageFireKey);
      this.imageFireKey = '';
    }
  }

  ngOnInit() {

    this.imageService.resetImage();

    if (this.tempId.id != null) {
      this.editMode = true;
      this.putProject.getProject(this.tempId.id)
        .subscribe(
        (response) => {
          this.project = response;
          this.image = response.image;
          this.imageKey = response.imageKey;
        },
        (error) => {
          console.error(error);
        });
    }
  }

  ngOnDestroy(): void {
    if (this.done === 'added') {
      this.imageService.deleteImage(this.imageFireKey);
    }
  }

}
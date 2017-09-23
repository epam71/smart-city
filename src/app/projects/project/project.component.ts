import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { ProjectServiceService } from '../../core/project-service/project-service.service';
import { AuthService } from '../../core/auth-service/auth-service.service';
import 'rxjs/add/operator/switchMap';
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  project;
  tempId;
  user;
  commentsResponse = '';
  ratingResponse = '';


  private _placeholderBase64 = ``;
      private _imgSafe: SafeUrl;
      private _placeHolderSafe: SafeUrl;

  constructor(private route: ActivatedRoute,
              private projectData: ProjectServiceService,
              private authService:AuthService,
              private sanitizer: DomSanitizer) {

    route.params.subscribe(param => {
      this.tempId = param;
    });
  }

  getInfo(event){
    this.commentsResponse = event.message;
  }

  getRatingInfo(event){
    this.ratingResponse = event;
  }

  ngOnInit(): void {

    this.projectData.getProject(this.tempId.id)
    .subscribe(
      (response) => {
        this.user = this.authService.getEmail();
        this.project = response;
        this._placeholderBase64 = 'data:image/jpeg;base64,' + this.project.image;
        this._placeHolderSafe = this.sanitizer.bypassSecurityTrustUrl(this._placeholderBase64);
        
        console.log(this._placeholderBase64);
      },
      (error) => {
        console.error(error);
      });
      
  }
}

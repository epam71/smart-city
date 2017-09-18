import { Component, OnInit, Input } from '@angular/core';
import { ProjectServiceService } from '../../core/project-service/project-service.service';
import { Project } from '../../models/project.model';
import { AuthService } from '../../core/auth-service/auth-service.service';

@Component({
  selector: 'rating',
  templateUrl: './project-rating.component.html',
  styleUrls: ['./project-rating.component.css']
})
export class RatingProjectComponent implements OnInit {

userEmail;
  @Input('ratingObj') ratingObjInfo;

  constructor(private ratingData: ProjectServiceService,
    private authService: AuthService) { }

  changeRating() {

    this.ratingData.postLikes(this.ratingObjInfo._id, { email: this.userEmail })
      .subscribe(
      (response) => {
        return this.ratingObjInfo.rating = response.currentRating;
      },
      (error) => {
        console.error(error);
      });
  }

  ngOnInit() {
this.userEmail = this.authService.getEmail();
  }
}

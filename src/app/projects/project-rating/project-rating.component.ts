import { Component, OnInit, Input } from '@angular/core';
import { ProjectServiceService } from '../../core/project-service/project-service.service';
import { Project } from '../models/project.model';
import { AuthService } from '../../core/auth-service/auth-service.service';

@Component({
  selector: 'rating',
  templateUrl: './project-rating.component.html',
  styleUrls: ['./project-rating.component.css']
})
export class RatingProjectComponent implements OnInit {


  @Input('ratingObj') ratingObjInfo;

  rating;

  constructor(private ratingData: ProjectServiceService,
    private authService: AuthService) {}

  changeRating() {

    this.ratingData.putProject(this.ratingObjInfo._id, {
      rating: ++this.ratingObjInfo.rating
    })
      .subscribe(
      (response) => {
        return this.ratingObjInfo.rating = response.rating;
      },
      (error) => {
        console.error(error);
      });
  }

  ngOnInit() { }

}

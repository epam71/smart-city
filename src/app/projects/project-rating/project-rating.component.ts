import { Component, OnInit, Input } from '@angular/core';
import { ProjectServiceService } from "../../core/project-service/project-service.service";
import { Project } from "../models/project.model";

@Component({
  selector: 'rating',
  templateUrl: './project-rating.component.html',
  styleUrls: ['./project-rating.component.css']
})
export class RatingProjectComponent implements OnInit {


  tempId;
  
  @Input('ratingObj') ratingObjInfo;


  constructor(private ratingData: ProjectServiceService) {

  }

  changeRating(){

    this.ratingData.putProject(this.ratingObjInfo._id, {
      budget: ++this.ratingObjInfo.budget
    })
    .subscribe(
      (response) => {
        console.log(response);
        return this.ratingObjInfo.budget = response.budget;
      },
      (error) => {
        console.log(error);
      }
    )
    console.log('test');
  }

  ngOnInit() {
    // this.rating = this.ratingData.getProject(this.ratingInfo);
    console.log(this.ratingObjInfo);
  }

}

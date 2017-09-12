import { Component, OnInit, Input } from '@angular/core';
import { ProjectServiceService } from '../../core/project-service/project-service.service';
import { Project } from '../models/project.model';

@Component({
  selector: 'comments',
  templateUrl: './project-comments.component.html',
  styleUrls: ['./project-comments.component.css']
})
export class CommentsProjectComponent implements OnInit {


  tempId;
  comments;
  @Input('commentsObj') commentsObjInfo;

  constructor(private commentsData: ProjectServiceService) {

  }


  ngOnInit() {
    console.log(this.tempId);
    // this.comments = this.commentsData.getProject(this.ratingObjInfo._id);
  }

}

import { Component, OnInit, Input } from '@angular/core';
import { ProjectServiceService } from '../../core/project-service/project-service.service';

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


  ngOnInit() {}

}

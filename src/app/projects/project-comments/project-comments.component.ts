import { Component, OnInit, Input } from '@angular/core';
import { ProjectServiceService } from '../../core/project-service/project-service.service';
import { AuthService } from '../../core/auth-service/auth-service.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'comments',
  templateUrl: './project-comments.component.html',
  styleUrls: ['./project-comments.component.css']
})
export class CommentsProjectComponent implements OnInit {


  tempId;
  comments;
  @Input('commentsObj') commentsObjInfo;

  constructor(private commentsData: ProjectServiceService,
              private authService: AuthService) {

  }

  addComment(form: NgForm) {
    const value = form.value;

        this.commentsData.postComment(this.commentsObjInfo._id, {
          username: this.authService.getNickname(),
          message: value.message,
          date: new Date()
      }).subscribe(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.error(error);
        });
      }

  ngOnInit() {
  }

}

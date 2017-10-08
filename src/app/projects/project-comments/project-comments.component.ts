import { Component, OnInit, Input, ViewChild, Output, OnChanges, EventEmitter } from '@angular/core';
import { ProjectServiceService } from '../../core/project-service/project-service.service';
import { AuthService } from '../../core/auth-service/auth-service.service';
import { NgForm } from '@angular/forms';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'comments',
  templateUrl: './project-comments.component.html',
  styleUrls: ['./project-comments.component.css']
})
export class CommentsProjectComponent implements OnInit {

  @Input('commentsObj') commentsObjInfo;
  @Input('userInfo') user;

  @Output() output: EventEmitter<any> = new EventEmitter();
  @ViewChild('f') slForm: NgForm;

  responseMessage;
  p;

  constructor(public commentsData: ProjectServiceService,
    public authService: AuthService) {

  }

  addComment(form: NgForm) {
    const value = form.value;

    let postComment = this.commentsData.postComment(this.commentsObjInfo._id, {
      username: this.authService.getEmail(),
      message: value.message,
    });

    let getComments = this.commentsData.getProject(this.commentsObjInfo._id);

    postComment.switchMap(
      event => {
        this.output.emit(event)
        return getComments;
      }
    )
      .subscribe(
      value => {
        this.commentsObjInfo = value;
        this.slForm.reset();
      });
  }

  clearForm() {
    this.slForm.reset();
  }

  deleteComment(key: any) {

    let deleteAction = this.commentsData.deleteComment(this.commentsObjInfo._id, key.id);
    let getCommentsAction = this.commentsData.getProject(this.commentsObjInfo._id);

    deleteAction.switchMap(
      event => {
        return getCommentsAction;
      }
    )
      .subscribe(
      value => {
        this.commentsObjInfo = value;
        this.slForm.reset();
      });

  }

  ngOnInit() {

  }

}

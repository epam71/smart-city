import { Component, OnInit, Input, ViewChild } from '@angular/core';
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
  @ViewChild('f') slForm: NgForm;

  constructor(private commentsData: ProjectServiceService,
              private authService: AuthService) {

  }

  addComment(form: NgForm) {
    const value = form.value;

        let postCommet = this.commentsData.postComment(this.commentsObjInfo._id, {
          username: this.authService.getNickname(),
          message: value.message,
          date: new Date()
      });

       let getComments = this.commentsData.getProject(this.commentsObjInfo._id);

       postCommet.switchMap(
           event => {
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

  ngOnInit() {
  }

}

import { Component, OnInit, Input } from '@angular/core';
import { ProjectServiceService } from '../../core/project-service/project-service.service';
import { AuthService } from '../../core/auth-service/auth-service.service';

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

  addComment() {
    console.log(this.commentsObjInfo.comments);

    let temp = {
        username: 'fsafsfsa',
        message: 'sfafsfsa',
      };
      console.log(this.commentsObjInfo.comments);
        this.commentsData.putProject(this.commentsObjInfo._id, this.commentsObjInfo.comments[1] = temp)
          .subscribe(
          (response) => {
            console.log(response);
          },
          (error) => {
            console.error(error);
          });
      }


test(){
  console.log(this.commentsObjInfo);
}

  ngOnInit() {
  }

}

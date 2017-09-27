import { Component, OnInit, Input} from '@angular/core';
import { NewsServiceService } from '../../core/news-service/news-service.service';
import { News } from '../../models/news.model';
import { AuthService } from '../../core/auth-service/auth-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'news-comment',
  templateUrl: './news-comment.component.html',
  styleUrls: ['./news-comment.component.css']
})
export class NewsCommentComponent implements OnInit {
  @Input('commentsObj') commentsInfo;

  private rForm: FormGroup;                   
  private message:string = '';
 

constructor(private service: NewsServiceService,
            private authService: AuthService,
            private fb: FormBuilder) {
              this.rForm = fb.group({
                'message' : [null, Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(80)])],
                'validate' : ''
            });
          }

addComment(message){
  let postCommet = this.service.postComment(this.commentsInfo._id, {
    username: this.authService.getNickname(),
    message: message,
    date: new Date()
});
  
  postCommet.switchMap(
      event => {
        return this.service.getNewsById(this.commentsInfo._id);
      }
    )
    .subscribe(
    value => {
      this.commentsInfo = value;
      this.rForm.reset();
    });
}          

ngOnInit() {
    
  }
}

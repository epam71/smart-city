import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { NewsServiceService } from '../../core/news-service/news-service.service';
import { AuthService } from '../../core/auth-service/auth-service.service';
import { News } from '../../models/news.model';

@Component({
  selector: 'news-like',
  templateUrl: './news-like.component.html',
  styleUrls: ['./news-like.component.css']
})
export class NewsLikeComponent implements OnInit {
  private userEmail;
  private showModal: boolean = false;
  private getUserRole;
  liked = false;

  @Input('ratingObj') likeInfo;

constructor(private service: NewsServiceService,
            private authService: AuthService) {}

colseModal(){
  this.showModal = false;
}

increaseLike() {
  this.showModal = true;
  if (this.liked !== true){
    this.service.postNewsLike(this.likeInfo._id, { email: this.userEmail })
        .subscribe(
        (response) => {
          this.liked = true;
         return this.likeInfo.rating = response.currentRating;
        },
        (error) => {
        console.error(error);
    });
}
}

ngOnInit() {
  this.getUserRole = this.authService.getRole();
  this.userEmail = this.authService.getEmail();
  }

  ngOnChanges(){
    if (this.likeInfo != null){
    this.likeInfo.likes.map(element => {
      if (element === this.authService.getEmail()){
        this.liked = true;
      }
    });
  }
}

}

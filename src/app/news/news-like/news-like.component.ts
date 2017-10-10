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
  public userEmail;
  public showModal: boolean = false;
  public liked = false;
  @Input('ratingObj') likeInfo;

  constructor(private newsService: NewsServiceService,
    public authService: AuthService) {}

  colseModal(){
    this.showModal = false;
  }

  increaseLike() {
    if ( this.authService.isLogedIn()){
      this.liked === true ?  this.liked = false : this.liked = true;
      this.newsService.postNewsLike(this.likeInfo._id, { email: this.userEmail })
        .subscribe(
          (response) => {
          return this.likeInfo.rating = response.currentRating;
          }, (error) => {
          console.error(error);
        });
    } else {
      this.showModal = true;
    }
  }

  ngOnInit() {
    this.userEmail = this.authService.getEmail();
  }

  ngOnChanges(){
    if (this.likeInfo != null){
      this.likeInfo.likes.map(element => {
        element === this.authService.getEmail() ? this.liked = true : this.liked = false;
      });
    }
  }
}

import { Component, OnInit, Input } from '@angular/core';
import { NewsServiceService } from '../../core/news-service/news-service.service';
import { News } from '../../models/news.model';
import { AuthService } from '../../core/auth-service/auth-service.service';

@Component({
  selector: 'news-like',
  templateUrl: './news-like.component.html',
  styleUrls: ['./news-like.component.css']
})
export class NewsLikeComponent implements OnInit {
  private userEmail;
  @Input('ratingObj') likeInfo;

constructor(private service: NewsServiceService,
            private authService: AuthService) {}

increaseLike() {
    this.service.postNewsLike(this.likeInfo._id, { email: this.userEmail })
        .subscribe(
        (response) => {
        return this.likeInfo.rating = response.currentRating;
        },
        (error) => {
        console.error('You can not post like twice');
    });
}

ngOnInit() {
    this.userEmail = this.authService.getEmail();
  }
}

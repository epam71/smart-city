import { Component, OnInit, OnChanges } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NewsServiceService } from '../../core/news-service/news-service.service';

import { News } from "../../models/news.model";
import 'rxjs/add/operator/switchMap';
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  private news;
  private newsId;
  private imagePath = '';
  private safeUrl: SafeUrl;
  private newsList;
  newsData
 
  constructor(private service: NewsServiceService,
              private route: ActivatedRoute,
              private domSanitizer: DomSanitizer) {
                route.params.subscribe(param => {
                  this.newsId = param;
                });
              }

  ngOnInit(): void {
    let newsData = this.service.getNewsById(this.newsId.id);
    this.newsList= this.service.getNewsBlock();
  
    newsData.switchMap(
          response => {
            this.news = response;
            this.imagePath = 'data:image/jpeg;base64,' + this.news.image;
            this.safeUrl = this.domSanitizer.bypassSecurityTrustUrl(this.imagePath); 
            return newsData;
          }
        )
          .subscribe(
          value => {
            this.newsData = value;
          });
      }
}

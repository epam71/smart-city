import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NewsServiceService } from '../../core/news-service/news-service.service';

import { News } from "../../models/news.model";
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

  constructor(private service: NewsServiceService,
              private route: ActivatedRoute,
              private domSanitizer: DomSanitizer) {
                route.params.subscribe(param => {
                  this.newsId = param;
                });
              }

  ngOnInit() {
    this.news= this.service.getNewsById(this.newsId.id)
      .subscribe(
        (response) => {
          this.news = response; 
          this.imagePath =  this.news.image;
          this.safeUrl = this.domSanitizer.bypassSecurityTrustUrl(this.imagePath); 
        },
        (error) => {
          console.error(error);
        });
  }

}

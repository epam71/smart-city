import { Component, OnInit } from '@angular/core';
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
  private newsData;
 
  constructor(private newsService: NewsServiceService,
              private route: ActivatedRoute,
              private domSanitizer: DomSanitizer ) {
                route.params.subscribe(param => {
                  this.newsId = param;
                });
              }

  goNews(event) {
    this.news = event;
    this.imagePath = event.image
  }
            
  ngOnInit(): void {
    let newsData = this.newsService.getNewsById(this.newsId.id);
    this.newsList= this.newsService.getNewsBlock();
  
    newsData.switchMap(
          response => {
            this.news = response;
            this.imagePath = this.news.image;
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

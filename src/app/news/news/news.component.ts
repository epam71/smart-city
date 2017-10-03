import { Component, OnInit, OnChanges } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NewsServiceService } from '../../core/news-service/news-service.service';

import { News } from "../../models/news.model";
import 'rxjs/add/operator/switchMap';
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/pluck';

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
  id$: Observable<string>;
 
  constructor(private service: NewsServiceService,
              private route: ActivatedRoute,
              private router: Router,
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
   
    let newsData = this.service.getNewsById(this.newsId.id);
    this.newsList= this.service.getNewsBlock();
  
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

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NewsServiceService } from '../../core/news-service/news-service.service';
import { News } from "../../models/news.model";
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})

export class NewsComponent implements OnInit {
  public news;
  public newsId;
  public newsList;
  public newsData;
 
  constructor(private newsService: NewsServiceService,
              private route: ActivatedRoute ) {
                route.params.subscribe(param => {
                  this.newsId = param;
                });
              }

  goNews(event) {
    this.news = event;
  }
            
  ngOnInit(): void {
    let newsData = this.newsService.getNewsById(this.newsId.id);
    this.newsList= this.newsService.getNewsBlock();
  
    newsData.switchMap(
      response => {
        this.news = response;
        return newsData;
      }
    )
    .subscribe(
      value => {
        this.newsData = value;
    });
  }
}

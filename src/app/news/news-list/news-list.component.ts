import { Component, OnInit, Output, Input } from '@angular/core';
import { Response } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { News } from "../../models/news.model";
import { NewsServiceService } from '../../core/news-service/news-service.service';
import { AuthService } from "../../core/auth-service/auth-service.service";

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css'],
})

export class NewsListComponent implements OnInit {
  public news;
  public sorting;
  public inputValue;
  public p;
  
  sortObj = [
    {sorting: '-date', name: 'Latest'},
    {sorting: 'date', name: 'Oldest'},  
    {sorting: '-rating', name: 'Popular'},
    {sorting: 'author', name: 'Author'}
  ];

  selectedObj= this.sortObj[1];

  constructor(private newsService: NewsServiceService, 
    private authService: AuthService){ 
  }
  
  onChangeValue(value) {
    this.inputValue = value;
    this.news = this.newsService.searchNews(this.inputValue);
  }

  onChangeObj(value) {
    this.sorting= value
    this.news= this.newsService.sortNews(this.sorting);
  }
 
  ngOnInit() {
    this.news= this.newsService.getNews();
    window.scrollTo(0, 0);
  }

}

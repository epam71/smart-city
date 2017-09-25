import { Component, OnInit, Output, Input } from '@angular/core';
import { Response } from '@angular/http';
import { Router } from '@angular/router';

import { News } from "../../models/news.model";
import { NewsServiceService } from '../../core/news-service/news-service.service';
import { AuthService } from "../../core/auth-service/auth-service.service";
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css'],
})

export class NewsListComponent implements OnInit {
  private sort = 'all';
  private sortKey;
  private news;
  private pagination: number[] = [];
  private email;
  private getUserRole;
 
  constructor(private service: NewsServiceService, 
    private authService: AuthService,
    private domSanitizer: DomSanitizer){  }
  
  sortByOldestDate() {
    this.sort = 'date';
    this.sortKey = 'normal';
  }

  sortByLatestDate() {
    this.sort = 'date';
    this.sortKey = 'reverse';
  }

  sortByAuthor() {
    this.sort = 'author';
    this.sortKey = 'normal';
  }

  ngOnInit() {
    this.news= this.service.getNews();

    this.email = this.authService.getEmail();
    this.getUserRole = this.authService.getRole();
  }

}

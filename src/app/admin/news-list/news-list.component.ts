import { Component, OnInit } from '@angular/core';
import { NewsServiceService } from "../../core/news-service/news-service.service";
import { Router } from "@angular/router";
import "rxjs/add/operator/takeWhile";

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css']
})
export class NewsListComponent implements OnInit {

  private subscriber;
  public news;
  private alive: boolean = true;
  private prop = 'all';
  private showPending = 3;
  private showActive = 3;

  sortByName() {
    this.prop = 'title';
  }

  sortByDate() {
    this.prop = 'date';
  }

  showMore(att) {
    if (att === 'pending') {
      this.showPending += 5;
    } else if (att === 'active') {
      this.showActive += 5;
    }
  }

  constructor(private newsData: NewsServiceService,
    private router: Router) {
    this.news = this.newsData.getNews();
    this.subscriber = this.newsData.look.asObservable().takeWhile(() => this.alive).subscribe(() => {
      setTimeout(() => { this.news = this.newsData.getNews() }, 100);
    });
  }

  ngOnInit() {
  }

}

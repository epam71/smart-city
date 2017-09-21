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
  private activeLength = 0;
  private pendingLength = 0;

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

  defineLength(data) {
    for (var i = 0; i < data.length; i++) {
      if (data[i].approved) {
        this.activeLength++;
      } else {
        this.pendingLength++;
      }
    }
  }

  constructor(private newsData: NewsServiceService,
    private router: Router) {
  }

  ngOnInit() {
    this.newsData.getNews().subscribe((response) => {
      this.news = response;
      this.defineLength(response);
    },
      (error) => {
        console.log(error)
      });

    this.subscriber = this.newsData.look.asObservable().takeWhile(() => this.alive).subscribe(() => {
      setTimeout(() => {
        this.newsData.getNews().subscribe((response) => {
          this.news = response;
          this.defineLength(response);
        },
          (error) => { console.log(error) });
      }, 100);
    });
  }

}

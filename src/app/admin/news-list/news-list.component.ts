import { Component, OnInit } from '@angular/core';
import { NewsServiceService } from "../../core/news-service/news-service.service";
import { Router } from "@angular/router";
import { News } from '../../models/news.model';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css']
})
export class NewsListComponent implements OnInit {

  public news: News[];
  public activeNews: News[];
  public pendingNews: News[];
  private prop = 'all';
  private showPending = 3;
  private showActive = 3;
  private showMorePendingButton;
  private showMoreActiveButton;


  sortByName() {
    this.prop = 'title';
  }

  sortByDate() {
    this.prop = 'date';
  }

  showMore(att) {
    if (att === 'pending') {
      this.showPending += 5;
      if(this.showPending >= this.pendingNews.length) {
        this.showMorePendingButton = false;
      }
    } else if (att === 'active') {
      this.showActive += 5;
      if(this.showActive >= this.activeNews.length) {
        this.showMoreActiveButton = false;
      }
    }
  }

  constructor(private newsData: NewsServiceService,
    private router: Router) {
  }

  ngOnInit() {
    this.newsData.getNewsShort().subscribe(
      (response) => {
        this.news = response;
        this.activeNews = response.filter(el => {
          return el.approved === true;
        });
        this.pendingNews = response.filter(el => {
          return el.approved === false;
        });
        if(this.pendingNews.length > this.showPending) {
          this.showMorePendingButton = true;
        }
        if(this.activeNews.length > this.showActive) {
          this.showMoreActiveButton = true;
        }
      },
      (error) => {
        console.log(error)
      });

    let httpResult = this.newsData.look.asObservable().switchMap(srcVal => {
      return this.newsData.getNewsShort();
    });

    httpResult.subscribe((response) => {
        this.news = response;
        this.activeNews = response.filter(el => {
          return el.approved === true;
        });
        this.pendingNews = response.filter(el => {
          return el.approved === false;
        });
        if(this.pendingNews.length > this.showPending) {
          this.showMorePendingButton = true;
        }
        if(this.activeNews.length > this.showActive) {
          this.showMoreActiveButton = true;
        }
    });
  }

}

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

  public news:News[];
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
    this.newsData.getNews().subscribe(
      (response) => {
        this.news = response
      },
      (error) => {
        console.log(error)
      });

    let saveData = this.newsData.look.asObservable();

    let httpResult = saveData.switchMap(srcVal => {
      return this.newsData.getNews();
    });

    httpResult.subscribe((response) => {
      this.news = response;
    });
  }

}

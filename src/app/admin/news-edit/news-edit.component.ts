import { Component, OnInit, ViewChild } from '@angular/core';
import { News } from '../../news/models/news.model';
import { Subscription } from "rxjs/Subscription";
import { NewsServiceService } from "../../core/news-service/news-service.service";
import { Router, ActivatedRoute } from "@angular/router";
import { Observable } from 'rxjs/Observable';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../core/auth-service/auth-service.service';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-news-edit',
  templateUrl: './news-edit.component.html',
  styleUrls: ['./news-edit.component.css']
})
export class NewsEditComponent implements OnInit {

  public news: News;
  public newsId: any;
  private editable: boolean = false;

  deleteNews() {
    this.newsData.deleteNews(this.newsId.id).subscribe();
    this.router.navigate(['/admin/news']);
    this.newsData.look.next('check');
  }

  cancelChanges() {
    this.editable = false;
  }

  editNews() {
    this.editable = true;
  }

  approveNews() {
    this.newsData.updateNews(this.newsId.id, { "approved": true, "status": "active" }).subscribe(
      (response) => {
        this.news.approved = response.approved;
        this.news.status = response.status;
      });
    this.newsData.look.next('check');
  }

  saveChanges(form: NgForm) {
    const value = form.value;

    let news: any = {
      title: value.newsTitle,
      image: value.image,
      desc: value.desc
    }

    this.newsData.updateNews(this.newsId.id, news)
      .subscribe(
      (response) => {
        this.news = response;
        this.editable = false;
        this.newsData.look.next('test');
      });
  }

  constructor(private route: ActivatedRoute,
    private router: Router,
    private newsData: NewsServiceService) {

    let myRoutes = route.params;

    let httpResult = myRoutes.switchMap(param => {
      this.newsId = param;
      return this.newsData.getNewsById(this.newsId.id);
    });

    httpResult.subscribe(
      (response) => {
        this.news = response;
      });
  }

  ngOnInit() {

  }

}

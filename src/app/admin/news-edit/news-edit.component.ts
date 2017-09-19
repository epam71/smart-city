import { Component, OnInit, ViewChild } from '@angular/core';
import { News } from '../../news/models/news.model';
import { Subscription } from "rxjs/Subscription";
import { NewsServiceService } from "../../core/news-service/news-service.service";
import { Router, ActivatedRoute } from "@angular/router";
import { Observable } from 'rxjs/Observable';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../core/auth-service/auth-service.service';

@Component({
  selector: 'app-news-edit',
  templateUrl: './news-edit.component.html',
  styleUrls: ['./news-edit.component.css']
})
export class NewsEditComponent implements OnInit {

  public news;
  public newsId;
  private editable = false;

  deleteNews() {
    this.newsData.deleteNews(this.newsId.id).subscribe();
    this.router.navigate(['/admin/news']);
    this.newsData.look.next('test');
  }

  cancelChanges() {
    this.editable = false;
  }

  editNews() {
    this.editable = true;
  }

  approveNews() {
    this.newsData.updateNews(this.newsId.id, { "approved": true, "status": "active" }).subscribe();
    this.newsData.look.next('test');
    setTimeout(() => { this.news = this.newsData.getNewsById(this.newsId.id) }, 100);
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
      () => {
        this.router.navigate(['/admin/news/' + this.newsId.id]);
        this.editable = false;
        this.newsData.look.next('test');
      });
  }

  constructor(private route: ActivatedRoute,
    private router: Router,
    private newsData: NewsServiceService) {

    route.params.subscribe(param => {
      this.newsId = param;
    });
    router.events.subscribe(() => {
      this.news = this.newsData.getNewsById(this.newsId.id);
    });
  }

  ngOnInit() {
    this.news = this.newsData.getNewsById(this.newsId.id);
  }

}

import { Component, OnInit, ViewChild } from '@angular/core';
import { News } from '../../models/news.model';
import { Subscription } from "rxjs/Subscription";
import { NewsServiceService } from "../../core/news-service/news-service.service";
import { Router, ActivatedRoute } from "@angular/router";
import { Observable } from 'rxjs/Observable';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../core/auth-service/auth-service.service';
import { ImageServiceService } from '../../core/image-service/image-service.service';
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
  private imageFire: string = '';
  private image: string = '';
  private progressBar: any;

  deleteNews() {
    this.newsData.deleteNews(this.newsId.id).subscribe();
    this.router.navigate(['/admin/news']);
    this.newsData.look.next('check');
  }

  pushImage() {
    this.imageService.uploadFile(event)
      .subscribe(res => { },
      (error) => {
        console.error(error);
      });
  }

  cancelChanges() {
    this.editable = false;
    this.imageService.resetImage();
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
    this.imageFire = this.imageService.fileName;

    let news: any = {
      title: value.newsTitle,
      image: this.imageFire || this.image,
      desc: value.desc
    }

    this.newsData.updateNews(this.newsId.id, news)
      .subscribe(
      (response) => {
        this.news = response;
        this.image = response.image;
        this.editable = false;
        this.newsData.look.next('test');
      });
    this.imageService.resetImage();
  }

  constructor(private route: ActivatedRoute,
    private router: Router,
    private newsData: NewsServiceService,
    private imageService: ImageServiceService) {

    let httpResult = route.params.switchMap(param => {
      this.newsId = param;
      return this.newsData.getNewsById(this.newsId.id);
    });

    httpResult.subscribe(
      (response) => {
        this.news = response;
        this.image = response.image;
      });
  }

  ngOnInit() {
    this.imageService.resetImage();
  }

}

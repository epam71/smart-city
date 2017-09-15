import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { Router } from '@angular/router';

import { News } from "../models/news.model";
import { NewsServiceService } from '../../core/news-service/news-service.service';


import { AuthService } from "../../core/auth-service/auth-service.service";

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css']
})
export class NewsListComponent implements OnInit {

  news;
  errorMessage:string;

  constructor(private service: NewsServiceService, private router: Router){  }

  deleteNews(id){
    if (confirm("Are you sure you want to delete this news?")) {
            this.service.deleteNews(id)
            .subscribe(
              (response) => {
               this.news = this.service.getNews();
              },
              (error) => { console.log(error)
              });
          }
        }

        ngOnInit() {
          this.news= this.service.getNews()
        }

}

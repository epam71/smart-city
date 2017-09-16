import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';

import { NewsServiceService } from '../../core/news-service/news-service.service';
import { AuthService } from "../../core/auth-service/auth-service.service";
import { News } from "../models/news.model";

@Component({
  selector: 'news-add',
  templateUrl: './news-add.component.html',
  styleUrls: ['./news-add.component.css']
})
export class NewsAddComponent implements OnInit {

constructor(private service: NewsServiceService, 
  private router: Router, 
  private authService: AuthService){  }

  onAddServer( title, image, desc) {
    let newsTemp: News = {  
     author: this.authService.getName(), 
      title: title,
      image: image, 
      desc: desc, 
      date: Date,
      approved: false,
      status: 'new'
    };
    
    this.service.postNews(newsTemp)
    .subscribe(
            (response) => console.log(response),
            (error) => console.log(error)
      );
  }

  ngOnInit() {
  
  }

}
import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';

import { NewsServiceService } from '../../core/news-service/news-service.service';

import { News } from "../models/news.model";

@Component({
  selector: 'news-add',
  templateUrl: './news-add.component.html',
  styleUrls: ['./news-add.component.css']
})
export class NewsAddComponent implements OnInit {


    constructor(private service: NewsServiceService, private router: Router){  }

  onAddServer(author: string, title: string, desc: string, image: string, date:string, approved: boolean) {
    let projectTemp: News = new News( title, author, desc, image, date, approved);
    
    this.service.postNews(projectTemp)
    .subscribe(
                 (response) => console.log(response),
                 (error) => console.log(error)
           );
  }

 

  ngOnInit() {
    
   
  }

 

}
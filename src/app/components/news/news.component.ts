import { Component, OnInit } from '@angular/core';
import { News } from "../../models/news.model";
import { NewsServiceService } from '../../core/news-service/news-service.service';
import { SlicePipe } from '@angular/common';


@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  img1: string;
  img2: string;
  img3: string;
  newsAll;
  constructor(private newsData: NewsServiceService) {
    this.img1 = '../assets/images/news1.jpg',
    this.img2 = '../assets/images/news2.jpg',
    this.img3 = '../assets/images/news3.jpg'
  }

  ngOnInit() {
    this.newsAll = this.newsData.getNews();
  }

}

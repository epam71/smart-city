import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  img1: string;
  img2: string;
  img3: string;
  constructor() {
    this.img1 = '../assets/images/news1.jpg',
    this.img2 = '../assets/images/news2.jpg',
    this.img3 = '../assets/images/news3.jpg'
  }

  ngOnInit() {
  }

}

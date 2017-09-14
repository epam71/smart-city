import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-static',
  templateUrl: './static.component.html',
  styleUrls: ['./static.component.css']
})
export class StaticComponent implements OnInit {
  subscribeImg: string;
  contactImg: string;
  mainVideo: string;
  img1: string;
  img2: string;
  img3: string;
  constructor() {
    this.subscribeImg = '../assets/images/lviv-city.jpg',
    this.mainVideo = '../assets/media/LvivNightTimelapse.mp4',
    this.contactImg = '../assets/images/lviv-contact.jpg'
    this.img1 = '../assets/images/news1.jpg',
    this.img2 = '../assets/images/news2.jpg',
    this.img3 = '../assets/images/news3.jpg'
  }

  ngOnInit() {
  }
}

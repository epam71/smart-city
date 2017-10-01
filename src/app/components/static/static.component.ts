import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-static',
  templateUrl: './static.component.html',
  styleUrls: ['./static.component.css']
})
export class StaticComponent implements OnInit {
  subscribeImg: string;
  countersImg: string;
  mainVideo: string;
  aboutImg: string;
  constructor() {
    this.subscribeImg = '../assets/images/lviv-city.jpg',
    this.countersImg = '../assets/images/airport_panorama.jpg',
    this.aboutImg = '../assets/images/content_about.jpg',
    this.mainVideo = '../assets/media/LvivNightTimelapse.mp4'
  }

  

  ngOnInit() {
  }

}

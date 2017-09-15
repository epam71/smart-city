import { Component, OnInit } from '@angular/core';
// import Router from '@angular/router';

@Component({
  selector: 'app-static',
  templateUrl: './static.component.html',
  styleUrls: ['./static.component.css']
})
export class StaticComponent implements OnInit {
  subscribeImg: string;
  mainVideo: string;
  img1: string;
  img2: string;
  img3: string;
  constructor() {
    this.subscribeImg = '../assets/images/lviv-city.jpg',
    this.mainVideo = '../assets/media/LvivNightTimelapse.mp4',
    this.img1 = '../assets/images/news1.jpg',
    this.img2 = '../assets/images/news2.jpg',
    this.img3 = '../assets/images/news3.jpg'
  }

  // constructor(private router: Router){

  // }

  ngOnInit() {
  }

  // onLoadServers(){
  //   this.router.navigate(['/news']);
  // }
}

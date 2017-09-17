import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  projectImg: string;
  constructor() {
    this.projectImg = '../assets/images/projects.jpg'
  }
  
  ngOnInit() {
  }

}

import { Component, OnInit } from '@angular/core';
import { ProjectServiceService } from '../../core/project-service/project-service.service';
import { Project } from '../../models/project.model';

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
  projects = 0;
  projectsDone = 0;

  constructor(private projectsData: ProjectServiceService) {
    this.subscribeImg = '../assets/images/lviv-city.jpg',
    this.countersImg = '../assets/images/airport_panorama.jpg',
    this.aboutImg = '../assets/images/content_about.jpg',
    this.mainVideo = '../assets/media/LvivNightTimelapse.mp4'
  }

  ngOnInit() {
    this.projectsData.getProjects().subscribe(
      (response) => {
          this.projects = response.length;
          response.forEach((el, i) => {
            if(el.status === "closed"){
              this.projectsDone++;
            }
          })
      }
    )
  }

}

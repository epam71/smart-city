import { Component, OnInit } from '@angular/core';
import { ProjectServiceService } from "../../core/project-service/project-service.service";

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.css']
})
export class ProjectsListComponent implements OnInit {

  projects;
  // rating;

  constructor(private projectsData: ProjectServiceService) {

  }

  // tempRating = 2;

  // getProjects(){
  //   this.projectsData.getProjects()
  //   .subscribe(
  //         (response) => {
  //           console.log(this.projects);
  //           return this.projects = response;
  //         },
  //         (error) => {
  //           console.log(error);
  //         }
  //       )
  //       console.log('test');
  // }

  // changeRating(id){
  //   this.tempRating++;
  //   console.log(id);
  //   // this.projectsData.putProject(id, number)
  //   // .subscribe(
  //   //   (response) => {
  //   //     console.log(this.rating);
  //   //     return this.rating = response;
  //   //   },
  //   //   (error) => {
  //   //     console.log(error);
  //   //   }
  //   // )
  //   console.log('test');
  // }

  ngOnInit() {
    this.projects = this.projectsData.getProjects();
    // this.rating = this.projectsData.getProjects();
  }

}

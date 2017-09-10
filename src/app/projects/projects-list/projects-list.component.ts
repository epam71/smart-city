import { Component, OnInit } from '@angular/core';
import { ProjectServiceService } from "../../core/project-service/project-service.service";

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.css']
})
export class ProjectsListComponent implements OnInit {

  projects;

  constructor(private projectsData: ProjectServiceService) {

  }

  getProjects(){
    this.projectsData.getProjects()
    .subscribe(
          (response) => {
            this.projects = response;
            console.log(this.projects);
          },
          (error) => {
            console.log(error);
          }
        )
        console.log('test');
  }

  ngOnInit() {
    this.projects = this.projectsData.getProjects();
  }

}

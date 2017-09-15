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

  deleteProject(id){

        this.projectsData.deleteProject(id)
        .subscribe(
          (response) => {
            console.log(response);
            this.projects = this.projectsData.getProjects();
          },
          (error) => {
            console.log(error)
          });
      }

  ngOnInit() {
    this.projects = this.projectsData.getProjects();
  }

}

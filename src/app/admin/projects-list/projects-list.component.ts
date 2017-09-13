import { Component, OnInit } from '@angular/core';
import { ProjectServiceService } from "../../core/project-service/project-service.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.css']
})
export class ProjectsListComponent implements OnInit {
  subscriber;
  projects;
  constructor(private projectsData: ProjectServiceService,
  private router: Router) { }

  ngOnInit() {
    this.projects = this.projectsData.getProjects();
    this.subscriber = this.projectsData.test.asObservable().subscribe((response)=>{
      
    });
  }

}

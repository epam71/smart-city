import { Component, OnInit } from '@angular/core';
import { ProjectServiceService } from "../../core/project-service/project-service.service";
import { Router } from "@angular/router";
import "rxjs/add/operator/takeWhile";

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.css']
})
export class ProjectsListComponent implements OnInit {
  
  private subscriber;
  public projects;
  private alive: boolean = true;

  constructor(private projectsData: ProjectServiceService,
  private router: Router) { }

  public ngOnInit() {
    this.projects = this.projectsData.getProjects();
    this.subscriber = this.projectsData.test.asObservable().takeWhile(() => this.alive).subscribe(()=>{
    setTimeout(()=>{this.projects = this.projectsData.getProjects()}, 200);
    console.log(this.projects);
    });
  }

  public ngOnDestroy() {
    this.alive = false; 
  }
}

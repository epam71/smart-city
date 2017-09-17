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

  private showPending = 5;
  private showActive = 5;
  private prop = 'all';
  private subscriber;
  public projects;
  private alive: boolean = true;


  sortByName() {
    this.prop = 'projectName';
  }

  sortByDate() {
    this.prop = 'date';
  }

  showMore(att){
    if (att === 'pending') {
      this.showPending += 5;
    } else if (att === 'active') {
      this.showActive += 5;
    }
  }


  constructor(private projectsData: ProjectServiceService,
    private router: Router) { }

  public ngOnInit() {
    this.projects = this.projectsData.getProjects();
    this.subscriber = this.projectsData.look.asObservable().takeWhile(() => this.alive).subscribe(() => {
      setTimeout(() => { this.projects = this.projectsData.getProjects() }, 100);
    });
  }

  public ngOnDestroy() {
    this.alive = false;
  }
}

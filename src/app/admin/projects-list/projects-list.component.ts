import { Component, OnInit } from '@angular/core';
import { ProjectServiceService } from "../../core/project-service/project-service.service";
import { AuthService } from '../../core/auth-service/auth-service.service';
import { Router } from '@angular/router';
import { Project } from '../../models/project.model';
import "rxjs/add/operator/takeWhile";

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.css']
})

export class ProjectsListComponent implements OnInit {

  private showPending: number = 3;
  private showActive: number = 3;
  private prop: string = 'all';
  private subscriber: any;
  public projects: Project[];
  private alive: boolean = true;


  sortByName() {
    this.prop = 'projectName';
  }

  sortByDate() {
    this.prop = 'date';
  }

  showMore(att) {
    if (att === 'pending') {
      this.showPending += 5;
    } else if (att === 'active') {
      this.showActive += 5;
    }
  }

  constructor(private projectsData: ProjectServiceService,
    private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.projectsData.getProjects().subscribe((response) => {
      this.projects = response
    },
      (error) => {
        console.log(error)
      });

    this.subscriber = this.projectsData.look.asObservable().takeWhile(() => this.alive).subscribe((response) => {
      setTimeout(() => {
        this.projectsData.getProjects().subscribe((response) => {
          this.projects = response
        },
          (error) => {
            console.log(error)
          });
      }, 100);
    });
  }

  public ngOnDestroy() {
    this.alive = false;
  }
}

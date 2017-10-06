import { Component, OnInit } from '@angular/core';
import { ProjectServiceService } from "../../core/project-service/project-service.service";
import { AuthService } from '../../core/auth-service/auth-service.service';
import { Router } from '@angular/router';
import { Project } from '../../models/project.model';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.css']
})

export class ProjectsListComponent implements OnInit {

  constructor(private projectsData: ProjectServiceService,
    private router: Router, private authService: AuthService) { }

  private showPending: number = 3;
  private showActive: number = 3;
  private prop: string = 'all';
  public projects: Project[];
  public pendingProjects: Project[];
  public activeProjects: Project[];
  private showMorePendingButton: boolean;
  private showMoreActiveButton: boolean;
  private searchData: string = ''; 

  sortByName() {
    this.prop = 'projectName';
  }

  sortByDate() {
    this.prop = 'date';
  }

  showMore(att) {
    if (att === 'pending') {
      this.showPending += 5;
      if (this.showPending >= this.pendingProjects.length) {
        this.showMorePendingButton = false;
      }
    } else if (att === 'active') {
      this.showActive += 5;
      if (this.showActive >= this.activeProjects.length) {
        this.showMoreActiveButton = false;
      }
    }
  }

  ngOnInit() {

    this.projectsData.getProjectsShort().subscribe(
      (response) => {
        this.projects = response;
        this.activeProjects = response.filter(el => {
          return el.approved === true && el.status !== 'closed';
        });
        this.pendingProjects = response.filter(el => {
          return el.approved === false && el.status !== 'closed';
        });
        if (this.pendingProjects.length > this.showPending) {
          this.showMorePendingButton = true;
        }
        if (this.activeProjects.length > this.showActive) {
          this.showMoreActiveButton = true;
        }
      },
      (error) => {
        console.log(error)
      });

    let httpResult = this.projectsData.look.asObservable().switchMap(srcVal => {
      return this.projectsData.getProjectsShort();
    });

    httpResult.subscribe((response) => {
      this.projects = response;
      this.activeProjects = response.filter(el => {
        return el.approved === true && el.status !== 'closed';
      });
      this.pendingProjects = response.filter(el => {
        return el.approved === false && el.status !== 'closed';
      });
      if (this.pendingProjects.length > this.showPending) {
        this.showMorePendingButton = true;
      }
      if (this.activeProjects.length > this.showActive) {
        this.showMoreActiveButton = true;
      }
    });

  }
}

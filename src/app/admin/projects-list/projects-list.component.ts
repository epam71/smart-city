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

  private showPending: number = 3;
  private showActive: number = 3;
  private prop: string = 'all';
  public projects: Project[];

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
    this.projectsData.getProjects().subscribe(
      (response) => {
        this.projects = response
      },
      (error) => {
        console.log(error)
      });

    let saveData = this.projectsData.look.asObservable();

    let httpResult = saveData.switchMap(srcVal => {
      return this.projectsData.getProjects();
    });

    httpResult.subscribe((response) => {
      this.projects = response;
    });

  }
}

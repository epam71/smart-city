import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ProjectServiceService } from '../../core/project-service/project-service.service';
import { AuthService } from '../../core/auth-service/auth-service.service';
import { trigger, state, transition, style, animate, group } from '@angular/animations';
@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.css'],
  animations: []
})
export class ProjectsListComponent implements OnInit {


  constructor(private projectsData: ProjectServiceService,
    private authService: AuthService) { }

  userCheck;
  projects;
  userProjects = false;
  approvedStatus: any = 'all';
  sortList = ['all', 'rating', 'name', 'date'];
  sortTypeList = ['normal', 'reverse'];
  sortTypeValue;
  sort = this.sortList[0];

  selectSort(event) {
    if (event === 'name') {
      event = 'projectName';
    }
    this.sort = event;
  }

  sortType(event) {
    this.sortTypeValue = event;
  }

  showUserProjects() {
    if (!this.userProjects) {
      this.userProjects = true;
      this.approvedStatus = 'all';
    } else {
      this.userProjects = false;
      this.approvedStatus = true;
    }
  }
  nick;
  email;
  
  ngOnInit() {
    this.projects = this.projectsData.getProjects();
    this.userCheck = this.authService.getRole();

    this.nick = this.authService.getNickname();
    this.email = this.authService.getEmail();
  }
}

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

    nick;
    email;

  userCheck;
  projects;
  userProjects = false;
  approvedStatus: any = 'all';
  sortList = ['unsorted', 'rating', 'name', 'date'];
  sortTypeValue = 'normal';
  sort = 'unsorted';

  selectSort(event) {

    this.sortList = ['rating', 'name', 'date'];

    if (event === 'name') {
      event = 'projectName';
    }
    this.sort = event;
  }

  sortType(event) {
    if ( this.sortTypeValue === 'normal'){
      this.sortTypeValue = 'reverse';
    } else {
      this.sortTypeValue = 'normal';
    }
  }

  showUserProjects() {
    if (!this.userProjects) {
      this.userProjects = true;
      this.approvedStatus = 'all';
    } else {
      this.userProjects = false;
      this.approvedStatus = 'all';
    }
  }
  
  ngOnInit() {
    this.projects = this.projectsData.getProjects();
    this.userCheck = this.authService.getRole();

    this.nick = this.authService.getNickname();
    this.email = this.authService.getEmail();
  }
}
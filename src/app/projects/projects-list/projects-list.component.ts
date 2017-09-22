import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ProjectServiceService } from '../../core/project-service/project-service.service';
import { AuthService } from '../../core/auth-service/auth-service.service';
import { trigger, state, transition, style, animate, group } from '@angular/animations';

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.css'],
})

export class ProjectsListComponent implements OnInit {


  constructor(private projectsData: ProjectServiceService,
    private authService: AuthService) { }

  searchData = '';

  nick;
  email;

  userCheck;
  projects;
  userProjects = false;
  sortTypeValue = 'normal';
  sort = 'unsorted';
  searchButton = true;
  projectsValues = [{
    key: 'unsorted',
    value: 'unsorted'
  }, {
    key: 'name',
    value: 'projectName'
  }, {
    key: 'rating',
    value: 'rating'
  }, {
    key: 'date',
    value: 'date'
  }];

  searchProject(event) {
    this.searchButton = false;
  }

  valueChange(newValue) {
    this.searchData = newValue;
    this.projects = this.projectsData.searchProjects(this.searchData, 'projectName');
  }

  selectSort(event) {

    for (let i = 0; i < this.projectsValues.length; i++) {
      if (this.projectsValues[i].key === event) {
        return this.sort = this.projectsValues[i].value;
      }
    }

  }

  sortType(event) {
    if (this.sortTypeValue === 'normal') {
      this.sortTypeValue = 'reverse';
    } else {
      this.sortTypeValue = 'normal';
    }
  }

  showUserProjects() {
    if (!this.userProjects) {
      this.userProjects = true;
      this.projects = this.projectsData.getUserProjects(this.authService.getNickname());
    } else {
      this.userProjects = false;
      this.projects = this.projectsData.getApprovedProjects();
    }
  }

  ngOnInit() {
    this.projects = this.projectsData.getProjects();

    this.userCheck = this.authService.getRole();
    this.nick = this.authService.getNickname();
    this.email = this.authService.getEmail();
  }
}
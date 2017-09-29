import { Component, OnInit, Output, EventEmitter, Input, OnChanges } from '@angular/core';
import { ProjectServiceService } from '../../core/project-service/project-service.service';
import { AuthService } from '../../core/auth-service/auth-service.service';
import { trigger, state, transition, style, animate, group } from '@angular/animations';
import { Project } from '../../models/project.model';
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';

import { UploadImage } from '../../models/image-models/image-upload';
import { ImageServiceService } from '../../core/image-service/image-service.service';
import 'rxjs/add/operator/switchMap';


@Component({
  selector: 'main-projects',
  templateUrl: './main-projects.component.html',
  styleUrls: ['./main-projects.component.css'],
})

export class ProjectMainComponent implements OnInit {
  testik;

  constructor(private projectsData: ProjectServiceService,
    private authService: AuthService) {}

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

    return this.projectsValues.forEach((el, i) => {
      if (this.projectsValues[i].key === event) {
        return this.sort = this.projectsValues[i].value;
      }
    });
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
      this.projectsData.getUserProjects(this.authService.getNickname())
      .subscribe((response) => {
        this.projects = response;
      });
    } else {
      this.userProjects = false;
      this.projectsData.getApprovedProjects()
      .subscribe((response) => {
        this.projects = response;
      });
    }

  }

  


  

  ngOnInit() {
    this.projects = this.projectsData.getProjects();

    this.userCheck = this.authService.getRole();
    this.nick = this.authService.getNickname();
    this.email = this.authService.getEmail();
  }

}
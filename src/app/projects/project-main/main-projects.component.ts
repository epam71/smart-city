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

  constructor(private projectsData: ProjectServiceService,
    private authService: AuthService) {}

  searchData = '';

  projects;
  userProjects = false;
  sort = 'unsorted';

  sortMemo = '';
  sortTypeValue = '';

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
    this.projects = this.projectsData.searchProjects(this.searchData);
  }

  selectSort(event) {

    return this.projectsValues.forEach((el, i) => {
      if (this.projectsValues[i].key === event) {
        this.sortMemo = this.projectsValues[i].value;
        return this.projects = this.projectsData.getProjects(this.sortMemo, this.sortTypeValue);
      }
    });
  }

  sortType(event) {

    if (this.sortTypeValue === '') {
      this.sortTypeValue = '-';
    } else {
      this.sortTypeValue = '';
    }
    return this.projects = this.projectsData.getProjects(this.sortMemo, this.sortTypeValue);
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
  }

}
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
    private authService: AuthService) { }

  searchData = '';
  userCheck = '';

  projects;
  userProjects = false;

  sortMemo = 'date';
  sortTypeValue = '-';

  searchButton = true;
  projectsValues = [{
    key: 'date',
    value: 'date'
  }, {
    key: 'name',
    value: 'projectName'
  }, {
    key: 'rating',
    value: 'rating'
  }];

  pagesArr = [];
  pages = [];
  limit: any = '9';
  skip: any = this.limit;
  currentPage: any = '1';

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
        return this.projects = this.projectsData.getPaginateProjects(this.limit, this.skip, this.sortMemo, this.sortTypeValue);
      }
    });
  }

  sortType(event) {

    if (this.sortTypeValue === '') {
      this.sortTypeValue = '-';
    } else {
      this.sortTypeValue = '';
    }
    return this.projects = this.projectsData.getPaginateProjects(this.limit, this.skip, this.sortMemo, this.sortTypeValue);
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

  checkPagination() {
    if (this.currentPage - 2 > 0) {

      this.pages = this.pagesArr.slice(+this.currentPage - 3, +this.currentPage + 2);

    } else if (this.currentPage - 1 > 0) {

      this.pages = this.pagesArr.slice(+this.currentPage - 2, +this.currentPage + 2);
    }
  }

  paginateFunc(event) {

    this.skip = event.target.innerText * this.limit;
    if (this.currentPage != event.target.innerText) {
      this.currentPage = event.target.innerText;
      this.projects = this.projectsData.getPaginateProjects(this.limit, this.skip, this.sortMemo, this.sortTypeValue);
    }

    this.checkPagination();
  }

  prev() {
    if (!(this.currentPage - 1 < 1)) {
      --this.currentPage;
      this.skip = this.currentPage * this.limit;
      this.projects = this.projectsData.getPaginateProjects(this.limit, this.skip, this.sortMemo, this.sortTypeValue);
    }

    this.checkPagination();
  }

  next() {

    if (!(+this.currentPage + 1 > this.pagesArr.length)) {

      ++this.currentPage;
      this.skip = this.currentPage * this.limit;
      this.projects = this.projectsData.getPaginateProjects(this.limit, this.skip, this.sortMemo, this.sortTypeValue);
    }

    this.checkPagination();
  }


  ngOnInit() {
    this.userCheck = this.authService.getRole();

    this.projects = this.projectsData.getPaginateProjects(this.limit, this.skip, this.sortMemo, this.sortTypeValue);
    this.projectsData.getProjectsNumber()
      .subscribe(response => {
        let totalPages = Math.ceil(response.count / this.limit);
        for (let i = 0; i < totalPages; i++) {
          this.pagesArr.push(i + 1);
        }
        this.pages = this.pagesArr.slice(0, 5);

      }, error => console.error(error))

  }
}
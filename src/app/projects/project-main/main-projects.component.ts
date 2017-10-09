import { Component, OnInit, Output, EventEmitter, Input, OnChanges, SimpleChanges, DoCheck } from '@angular/core';
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

export class ProjectMainComponent implements OnInit, DoCheck {

  constructor(public projectsData: ProjectServiceService,
    public authService: AuthService) {

  }

  private searchData = '';
  private userCheck: boolean;

  private projects;
  private userProjects = '';

  private sortMemo = 'date';
  private sortTypeValue = '-';

  private searchButton = true;
  private projectsValues = [{
    key: 'date',
    value: 'date'
  }, {
    key: 'name',
    value: 'projectName'
  }, {
    key: 'rating',
    value: 'rating'
  }];

  private pagesArr = [];
  private pages = [];
  private limit: any = '9';
  private skip: any = this.limit;
  private currentPage: any = '1';
  public paginationShow = true;

  searchProject(event) {
    this.searchButton = false;
  }

  valueChange(newValue) {
    this.paginationShow = false;
    this.skip = this.limit;
    this.currentPage = '1';
    this.searchData = newValue;
    this.projects = this.projectsData.getPaginateProjects(this.limit, this.skip,
       this.sortMemo, this.sortTypeValue, this.userProjects, this.searchData);
  }

  closeSearch(){
    this.valueChange('');
    this.searchButton = true;
    this.paginationShow = true;
  }

  selectSort(event) {

    return this.projectsValues.forEach((el, i) => {
      if (this.projectsValues[i].key === event) {
        this.sortMemo = this.projectsValues[i].value;
        return this.projects = this.projectsData.getPaginateProjects(this.limit, this.skip, this.sortMemo, this.sortTypeValue, this.userProjects);
      }
    });
  }

  sortType(event) {

    if (this.sortTypeValue === '') {
      this.sortTypeValue = '-';
    } else {
      this.sortTypeValue = '';
    }
    return this.projects = this.projectsData.getPaginateProjects(this.limit, this.skip, this.sortMemo, this.sortTypeValue, this.userProjects);
  }

  showUserProjects() {
    this.currentPage = '1';
    this.skip = this.limit;
    if (!this.userProjects) {
      this.pagesArr = [];
      this.projectsData.getUserProjectsNumber(this.authService.getEmail())
        .subscribe(response => {
          let totalPages = Math.ceil(response.count / this.limit);
          for (let i = 0; i < totalPages; i++) {
            this.pagesArr.push(i + 1);
          }
          this.pages = this.pagesArr.slice(0, 5);

        }, error => console.error(error))
      this.userProjects = this.authService.getEmail();
      this.projects = this.projectsData.getPaginateProjects(this.limit, this.skip,
        this.sortMemo, this.sortTypeValue, this.userProjects);
    } else {
      this.pagesArr = [];
      this.projectsData.getApprovedProjectsNumber()
        .subscribe(response => {
          let totalPages = Math.ceil(response.count / this.limit);
          for (let i = 0; i < totalPages; i++) {
            this.pagesArr.push(i + 1);
          }
          this.pages = this.pagesArr.slice(0, 5);

        }, error => console.error(error))
      this.userProjects = '';
      this.projects = this.projectsData.getPaginateProjects(this.limit, this.skip,
        this.sortMemo, this.sortTypeValue, this.userProjects);
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
      this.projects = this.projectsData.getPaginateProjects(this.limit, this.skip, this.sortMemo, this.sortTypeValue, this.userProjects);
    }

    this.checkPagination();
  }

  prev() {
    if (!(this.currentPage - 1 < 1)) {
      --this.currentPage;
      this.skip = this.currentPage * this.limit;
      this.projects = this.projectsData.getPaginateProjects(this.limit, this.skip, this.sortMemo, this.sortTypeValue, this.userProjects);
    }

    this.checkPagination();
  }

  next() {

    if (!(+this.currentPage + 1 > this.pagesArr.length)) {

      ++this.currentPage;
      this.skip = this.currentPage * this.limit;
      this.projects = this.projectsData.getPaginateProjects(this.limit, this.skip, this.sortMemo, this.sortTypeValue, this.userProjects);
    }

    this.checkPagination();
  }


  ngOnInit() {

    this.projects = this.projectsData.getPaginateProjects(this.limit, this.skip, this.sortMemo, this.sortTypeValue, this.userProjects);
    this.projectsData.getApprovedProjectsNumber()
      .subscribe(response => {
        let totalPages = Math.ceil(response.count / this.limit);
        for (let i = 0; i < totalPages; i++) {
          this.pagesArr.push(i + 1);
        }
        this.pages = this.pagesArr.slice(0, 5);

      }, error => console.error(error))

  }

  ngDoCheck() {
    this.userCheck = this.authService.isLogedIn();
  }
}
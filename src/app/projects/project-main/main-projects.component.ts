import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ProjectServiceService } from '../../core/project-service/project-service.service';
import { AuthService } from '../../core/auth-service/auth-service.service';
import { trigger, state, transition, style, animate, group } from '@angular/animations';
import { Project } from '../../models/project.model';
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'main-projects',
  templateUrl: './main-projects.component.html',
  styleUrls: ['./main-projects.component.css'],
})

export class ProjectMainComponent implements OnInit {


  constructor(private projectsData: ProjectServiceService,
    private authService: AuthService,
    private sanitizer: DomSanitizer) { }

  searchData = '';
  nick;
  email;
  userCheck;
  private _placeHolderSafe: SafeUrl = '';

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

  test(){



    for (let i = 0; i < 15; i++){
    var text = "";
    var possible = "ABCDE FGHIJKL MNOP QRSTU VWXYZabcd efghijklmn opqrstuvwxyz";
  
    let temp = {
      func: function(n, q) {
      for (var i = 0; i < n; i++){
      text += possible.charAt(Math.floor(Math.random() * q));
    }
    return text;
  }
  }
  console.log(temp.func(5, 5));

    let projectEdit: any = {
      author: this.authService.getNickname(),
      authorEmail: this.authService.getEmail(),
      projectName: temp.func(5, 5),
      image: '',
      desc: temp.func(500, possible.length),
      goals: temp.func(123, possible.length),
      result: temp.func(122, possible.length),
      budget: 1000,
      approved: false,
      status: 'new'
    }

  }
  }

  ngOnInit() {
    this.projects = this.projectsData.getProjects();

    this.userCheck = this.authService.getRole();
    this.nick = this.authService.getNickname();
    this.email = this.authService.getEmail();
  }
}
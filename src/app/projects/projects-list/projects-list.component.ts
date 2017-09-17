import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ProjectServiceService } from '../../core/project-service/project-service.service';

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.css']
})
export class ProjectsListComponent implements OnInit {

  constructor(private projectsData: ProjectServiceService) { }

  projects;
  userProjects = false;
  userLogin;
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
    if (!this.userProjects){
      this.userProjects = true;
    } else {
      this.userProjects = false;
    }
  }

  ngOnInit() {
    this.projects = this.projectsData.getProjects();
  }

}

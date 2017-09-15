import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ProjectServiceService } from '../../core/project-service/project-service.service';

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.css']
})
export class ProjectsListComponent implements OnInit {

  projects;

  constructor(private projectsData: ProjectServiceService) { }

  userProjects = false;
  sortList = ['all', 'rating', 'name', 'date'];
  sort = this.sortList[0];
  sortTypeValue = 'false';

  selectSort(event) {
    if (event === 'name') {
      event = 'projectName';
    }
    this.sort = event;
  }

  sortType(event) {
    this.sortTypeValue = event;
  }

  showUserProjects(event) {
    this.userProjects = event;
  }

  ngOnInit() {
    this.projects = this.projectsData.getProjects();
  }

}

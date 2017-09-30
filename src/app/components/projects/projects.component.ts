import { Component, OnInit } from '@angular/core';
import { ProjectServiceService } from '../../core/project-service/project-service.service';
import { Project } from '../../models/project.model';
import { SlicePipe } from '@angular/common';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  projectImg: string;
  projectsApproved;
  order: string = 'date';
  constructor(private projectsData: ProjectServiceService) {
    this.projectImg = '../assets/images/projects.jpg';
  }

  ngOnInit() {
    this.projectsApproved = this.projectsData.getApprovedProjects();
  }

}

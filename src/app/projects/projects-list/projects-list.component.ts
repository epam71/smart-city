import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ProjectServiceService } from '../../core/project-service/project-service.service';
import { AuthService } from '../../core/auth-service/auth-service.service';
import { trigger, state, transition, style, animate, group } from '@angular/animations';
import { Project } from '../../models/project.model';


@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.css'],
})

export class ProjectsListComponent implements OnInit {

  constructor(private projectsData: ProjectServiceService,
    private authService: AuthService) { }

  @Input('key') key;
  @Input('ownProjects') ownProjects = '';

  ngOnInit() { }
}
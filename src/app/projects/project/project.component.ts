import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { ProjectServiceService } from '../../core/project-service/project-service.service';
import { AuthService } from '../../core/auth-service/auth-service.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  project;
  tempId;

  constructor(private route: ActivatedRoute,
              private projectData: ProjectServiceService,
              private authService:AuthService) {

    route.params.subscribe(param => {
      this.tempId = param;
    });
  }

  ngOnInit(): void {
    this.project = this.projectData.getProject(this.tempId.id);
  }
}

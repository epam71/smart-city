import { Component, OnInit, OnChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { ProjectServiceService } from '../../core/project-service/project-service.service';
import { AuthService } from '../../core/auth-service/auth-service.service';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  public projects;
  public project;
  public tempId;
  public user;
  private image = '';
  private smallImage = '';

  constructor(private route: ActivatedRoute,
    public projectData: ProjectServiceService,
    public authService: AuthService) {


    route.params.subscribe(param => {
      this.tempId = param;
    });
  }

  goProject(event) {
    this.project = event;
    this.image = event.image
  }

  closeModalWindow() {

    this.projectData.message = '';
  }

  ngOnInit(): void {

    let getProjectData = this.projectData.getProject(this.tempId.id)
    let getProjectsData = this.projectData.getRatingProjects();

    getProjectData.switchMap(
      response => {
        this.user = this.authService.getEmail();
        this.project = response;
        this.image = response.image
        this.smallImage = this.image.replace('?alt=media&', '_thumb.jpg?alt=media&');
        return getProjectsData;
      }
    )
      .subscribe(
      value => {
        this.projects = value;
      });

  }
}

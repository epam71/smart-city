import { Component, OnInit } from '@angular/core';
import { Subscription } from "rxjs/Subscription";
import { ProjectServiceService } from "../../core/project-service/project-service.service";
import { Router, ActivatedRoute } from "@angular/router";
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-projects-edit',
  templateUrl: './projects-edit.component.html',
  styleUrls: ['./projects-edit.component.css']
})
export class ProjectsEditComponent implements OnInit {

  public project;
  public projectId;
  public editable = false;

  deleteProject() {
    console.log(this.projectId.id);
    this.projectData.deleteProject(this.projectId.id).subscribe(response => {console.log(response)});
    this.router.navigate(['/admin/projects']);
    this.projectData.test.next('test');
  }

  editProject() {
    this.editable = true; 
  }



  // approveProject() {
  //   this.projectData.putProject(this.projectId.id, "");
  // }

  saveChanges() {
    this.editable = false;
  }


  constructor(private route: ActivatedRoute,
    private router: Router,
    private projectData: ProjectServiceService) {

    route.params.subscribe(param => {
      this.projectId = param;
    });
    router.events.subscribe(()=>this.project = this.projectData.getProject(this.projectId.id));
  }

  ngOnInit(): void {
    this.project = this.projectData.getProject(this.projectId.id);
  }

}


import { Component, OnInit } from '@angular/core';
import { Project } from "../../projects/models/project.model";
import { Subscription } from "rxjs/Subscription";
import { ProjectServiceService } from "../../core/project-service/project-service.service";
import { Router, ActivatedRoute } from "@angular/router";
import { Observable } from 'rxjs/Observable';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-projects-edit',
  templateUrl: './projects-edit.component.html',
  styleUrls: ['./projects-edit.component.css']
})
export class ProjectsEditComponent implements OnInit {

  public project;
  public projectId;
  public editable = false;
  

// projectInfo(form: NgForm) {
//   const value = form.value;
// }

  deleteProject() {
    this.projectData.deleteProject(this.projectId.id).subscribe();
    this.router.navigate(['/admin/projects']);
    this.projectData.test.next('test');
  }

  cancelChanges() {
    this.editable = false;
  }

   editProject() {
    this.editable = true;
    this.projectData.putProject(this.projectId.id, {}).subscribe();
    this.projectData.test.next('test');
  }
    
  approveProject() {
    this.projectData.putProject(this.projectId.id, {"approved": true}).subscribe();
    this.projectData.test.next('test');
  }

  closeProject() {
    this.projectData.putProject(this.projectId.id, {"status": "closed"}).subscribe();
  }

  constructor(private route: ActivatedRoute,
    private router: Router,
    private projectData: ProjectServiceService) {

    route.params.subscribe(param => {
      this.projectId = param;
    });
    router.events.subscribe(() => {
      this.project = this.projectData.getProject(this.projectId.id);

//////////////////////////////////////////////change projectInfo object
    });
  }

  ngOnInit(): void {
    this.project = this.projectData.getProject(this.projectId.id);
  }

}


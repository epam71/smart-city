import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from "rxjs/Subscription";
import { ProjectServiceService } from "../../core/project-service/project-service.service";
import { Router, ActivatedRoute } from "@angular/router";
import { Observable } from 'rxjs/Observable';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../core/auth-service/auth-service.service';



@Component({
  selector: 'app-projects-edit',
  templateUrl: './projects-edit.component.html',
  styleUrls: ['./projects-edit.component.css']
})
export class ProjectsEditComponent implements OnInit {

  public project;
  public projectId;
  private editable = false;

  deleteProject() {
    this.projectData.deleteProject(this.projectId.id).subscribe();
    this.router.navigate(['/admin/projects']);
    this.projectData.look.next('test');
  }

  cancelChanges() {
    this.editable = false;
  }

  editProject() {
    this.editable = true;
  }

  approveProject() {
    this.projectData.putProject(this.projectId.id, { "approved": true, "status": "active" }).subscribe();
    this.projectData.look.next('test');
    setTimeout(() => { this.project = this.projectData.getProject(this.projectId.id) }, 100);
  }

  closeProject() {
    this.projectData.putProject(this.projectId.id, { "status": "closed" }).subscribe();
    this.router.navigate(['/admin/projects/']);
  }

  constructor(private route: ActivatedRoute,
    private router: Router,
    private projectData: ProjectServiceService) {

    route.params.subscribe(param => {
      this.projectId = param;
    });
    router.events.subscribe(() => {
      this.project = this.projectData.getProject(this.projectId.id);
    });
  }

  saveChanges(form: NgForm) {
    const value = form.value;

    let project: any = {
      projectName: value.projectName, 
      image: value.image,
      desc: value.desc, 
      goals: value.goals, 
      result: value.result, 
      budget: value.budget
    }
    
    this.projectData.putProject(this.projectId.id, project)
      .subscribe(
      () => {
        this.router.navigate(['/admin/projects/' + this.projectId.id]);
        this.editable = false;
        this.projectData.look.next('test');
      });
  }

  ngOnInit(): void {
    this.project = this.projectData.getProject(this.projectId.id);
  }

}


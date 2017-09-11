import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectServiceService } from "../../core/project-service/project-service.service";
import { Router } from '@angular/router';
import { Project } from "../models/project.model";

// class Project{
  
//     constructor(public projectName: string, public image: string, 
//                 public shortDesc: any, public fullDesc: any,
//                 public goals: any, public result: any, public involved: any,
//                 public type: boolean, 
//                 public budget: any, public approved: boolean = false) {
  
//     }
//   }


@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.css']
})
export class ProjectEditComponent implements OnInit {

  project;
  tempId;
  constructor(private ar: ActivatedRoute,
              private putProject: ProjectServiceService,
              private router: Router) {
                ar.params.subscribe( param => {
                  this.tempId = param;
                  });

  }

    editProject(event, projectName, linkImg, shortDesc, fullDesc, goals, result, involved, budget, type){
      event.preventDefault();
      let projectTemp: Project = new Project(
        projectName.value, linkImg.value, shortDesc.value, 
        fullDesc.value, goals.value, result.value, involved.value, type.value, budget.value);

      let mock = {name: projectName.value}

      this.putProject.putProject(this.tempId.id, mock)
      .subscribe(
        (response) => {
          console.log(response);
          this.router.navigate(['/projects']);
        },
        (error) => {
          console.log(error)
        });
        
    }

  ngOnInit() {
    console.log(this.putProject.getProject(this.tempId.id));
    console.log(this.tempId.id);
    this.project = this.putProject.getProject(this.tempId.id);
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectServiceService } from "../../core/project-service/project-service.service";
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
  selector: 'app-project-add',
  templateUrl: './project-add.component.html',
  styleUrls: ['./project-add.component.css']
})
export class ProjectAddComponent implements OnInit {

  // project;

  constructor(private postProject: ProjectServiceService,
              private router: Router) {

  }


  addNewProject(event, projectName, shortDesc, fullDesc, image, category){
    event.preventDefault();
    console.log(projectName.value);
    let projectTemp: Project = new Project(
      projectName.value, shortDesc.value, fullDesc.value,
      image.value, category.value);
    // this.router.navigate(['/projects']);
      console.log(projectTemp);
      this.postProject.postProject(projectTemp)
      .subscribe(
        (response) => console.log(response),
        (error) => console.log(error)
        )
    }
    
  ngOnInit() {
    console.log('asdfsa');
  }

}

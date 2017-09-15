import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectServiceService } from "../../core/project-service/project-service.service";
import { Project } from "../models/project.model";
import { AuthService } from "../../core/auth-service/auth-service.service";


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
errorMessage = '';
  constructor(private postProject: ProjectServiceService,
              private router: Router,
              private authService: AuthService) {

  }


  addNewProject(event, projectName, shortDesc, fullDesc, image, category){
    event.preventDefault();
    console.log(projectName.value);
    let projectTemp: Project = new Project( 
      this.authService.getNickname(),
      projectName.value, shortDesc.value, fullDesc.value,
      image.value, category.value);

    // this.router.navigate(['/projects']);
      console.log(projectTemp);
      this.postProject.postProject(projectTemp)
      .subscribe(
        (response) => {
          console.log(response);
          this.router.navigate(['/projects']);
        },
        (error) => {
          console.log(error)
          this.errorMessage = error;
        });
    }
    
  ngOnInit() {
    console.log('asdfsa');
  }

}

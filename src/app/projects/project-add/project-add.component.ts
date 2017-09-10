import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectServiceService } from "../../core/project-service/project-service.service";

class Project{

  constructor(public projectName: string, public image: string, 
              public shortDesc: any, public fullDesc: any,
              public type: boolean, 
              public budget: any, public approved: boolean = false) {

  }
}

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


  addNewProject(event, projectName, linkImg, shortDesc, fullDesc, budget, type){
    event.preventDefault();
    console.log(projectName.value);
      let projectTemp: Project = new Project(projectName.value, linkImg.value, shortDesc.value, fullDesc.value, type.value, budget.value);
      console.log(projectTemp);
      this.router.navigate(['/projects']);
      // this.postProject.postProject(this.project)
      // .subscribe(
      //   (response) => console.log(response),
      //   (error) => console.log(error)
      //   )
    }
    
  ngOnInit() {
    console.log('asdfsa');
  }

}

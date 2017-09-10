import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from "rxjs/Subscription";
import { ProjectServiceService } from "../../core/project-service/project-service.service";

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {


  project;
  tempId;


  constructor(private route: ActivatedRoute,
    private projectData: ProjectServiceService) {

    route.params.subscribe(param => {
      this.tempId = param;
    });
  }


  // getProject(id){
  //   this.projectData.getProject(id)
  //   .subscribe(
  //     (response) => {
  //       this.project = response;
  //       console.log(this.project);
  //     },
  //     (error) => {
  //       console.log(error);
  //     }
  //   )
  // }

  ngOnInit(): void {
    console.log(this.tempId.id);
    this.project = this.projectData.getProject(this.tempId.id);
    console.log(this.project);
  }

}

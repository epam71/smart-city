import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectServiceService } from "../../core/project-service/project-service.service";

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {


  project;
  tempId;


  constructor(private ar: ActivatedRoute,
    private projectData: ProjectServiceService) {

ar.params.subscribe( param => {
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

  ngOnInit() {
    console.log(this.tempId.id);
    this.project = this.projectData.getProject(this.tempId.id);
  }

}

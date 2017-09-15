import { Component, OnInit } from '@angular/core';
import { ProjectServiceService } from "../../core/project-service/project-service.service";
import { AuthService } from "../../core/auth-service/auth-service.service";

@Component({
  selector: 'app-my-projects',
  templateUrl: './my-projects.component.html',
  styleUrls: ['./my-projects.component.css']
})
export class MyProjectsComponent implements OnInit {

  myProjects;

  constructor(private myProjectsData: ProjectServiceService,
              private authService: AuthService) { }

  // getProjects(){
  //   this.myProjectsData.getProjects()
  //   .subscribe(
  //         (response) => {
  //           this.myProjectsData = response;
  //           console.log(this.myProjectsData);
  //         },
  //         (error) => {
  //           console.log(error);
  //         }
  //       )
  //       console.log('test');
  // }

  ngOnInit() {
    this.myProjects = this.myProjectsData.getProjects();
    console.log(this.authService.getNickname());
    this.authService.handleAuthentication();
  }

}

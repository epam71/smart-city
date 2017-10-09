import { Component, OnInit } from '@angular/core';
import { ProjectServiceService } from '../../core/project-service/project-service.service';
import { Project } from '../../models/project.model';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {
  projectsApproved;
  private NextPhotoInterval:number = 3000;
  //Looping or not
  private noLoopSlides:boolean = false;
  //images
  private slides:Array<any> = [];

  constructor(private projectsData: ProjectServiceService) {
    this.addNewSlide();
  }

  private addNewSlide() {
    this.projectsData.getApprovedProjects().subscribe(
        (response)=>{
          this.projectsApproved = response.forEach(item =>{
            this.slides.push({image:`${item.image}`});
          });
          
        }
    );
  }

  private removeLastSlide() {
      this.slides.pop();
  }

  ngOnInit() {
  }

}

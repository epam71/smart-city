import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsListComponent } from './projects-list/projects-list.component';
import { ProjectComponent } from './project/project.component';
import { ProjectAddComponent } from './project-add/project-add.component';
import { ProjectEditComponent } from './project-edit/project-edit.component';
import { MyProjectsComponent } from './my-projects/my-projects.component';
import { routing } from './projects.routes';
import { RatingProjectComponent } from "./project-rating/project-rating.component";

@NgModule({
  imports: [
    CommonModule,
    routing
  ],
  declarations: [RatingProjectComponent, ProjectsListComponent, ProjectComponent, ProjectAddComponent, ProjectEditComponent, MyProjectsComponent]
})
export class ProjectsModule { }

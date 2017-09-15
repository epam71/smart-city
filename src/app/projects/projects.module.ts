import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsListComponent } from './projects-list/projects-list.component';
import { ProjectComponent } from './project/project.component';
import { ProjectAddComponent } from './project-add/project-add.component';
import { ProjectEditComponent } from './project-edit/project-edit.component';
import { MyProjectsComponent } from './my-projects/my-projects.component';
import { routing } from './projects.routes';
import { RatingProjectComponent } from './project-rating/project-rating.component';
import { FilterUser } from "../pipes/filter-user-projects.pipe";
import { CommentsProjectComponent } from "./project-comments/project-comments.component";

@NgModule({
  imports: [
    CommonModule,
    routing
  ],
  declarations: [RatingProjectComponent,
                CommentsProjectComponent,
                 ProjectsListComponent, 
                 ProjectComponent, 
                 ProjectAddComponent, 
                 ProjectEditComponent, 
                 MyProjectsComponent,
                 FilterUser]
})
export class ProjectsModule { }

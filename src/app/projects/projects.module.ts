import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsListComponent } from './projects-list/projects-list.component';
import { ProjectComponent } from './project/project.component';
import { ProjectEditComponent } from './project-edit/project-edit.component';
import { MyProjectsComponent } from './my-projects/my-projects.component';
import { routing } from './projects.routes';

@NgModule({
  imports: [
    CommonModule,
    routing
  ],
  declarations: [ProjectsListComponent, ProjectComponent, ProjectEditComponent, MyProjectsComponent]
})
export class ProjectsModule { }

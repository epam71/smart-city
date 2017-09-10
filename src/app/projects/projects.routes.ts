import { MyProjectsComponent } from './my-projects/my-projects.component';
import { ProjectComponent } from './project/project.component';
import { ProjectEditComponent } from './project-edit/project-edit.component';
import { ProjectsListComponent } from './projects-list/projects-list.component';

import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectAddComponent } from "./project-add/project-add.component";

const routes: Routes = [
    {
        path: 'myprojects',
        component: MyProjectsComponent
    },
    {
        path: 'new',
        component: ProjectAddComponent
    },
    {
        path: ':id',
        component: ProjectComponent
    },
    {
        path: ':id/edit',
        component: ProjectEditComponent
    },
    {
        path: '',
        component: ProjectsListComponent
    }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);

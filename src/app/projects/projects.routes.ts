import { MyProjectsComponent } from './my-projects/my-projects.component';
import { ProjectComponent } from './project/project.component';
import { ProjectEditComponent } from './project-edit/project-edit.component';
import { ProjectsListComponent } from './projects-list/projects-list.component';

import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path: 'myproject',
        component: MyProjectsComponent
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

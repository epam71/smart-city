import { ProjectComponent } from './project/project.component';
import { ProjectEditComponent } from './project-edit/project-edit.component';
import { ProjectsListComponent } from './projects-list/projects-list.component';

import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectMainComponent } from './project-main/main-projects.component';

const routes: Routes = [
    {
        path: 'new',
        component: ProjectEditComponent
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
        component: ProjectMainComponent
    }
    // {
    //     path: '',
    //     component: ProjectsListComponent
    // }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);

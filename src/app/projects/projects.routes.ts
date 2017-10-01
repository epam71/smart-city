import { ProjectComponent } from './project/project.component';
import { ProjectEditComponent } from './project-edit/project-edit.component';
import { ProjectsListComponent } from './projects-list/projects-list.component';

import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectMainComponent } from './project-main/main-projects.component';
import { UserAuthGuardService } from '../core/admin-auth-guard/user-auth-guard.service';

const routes: Routes = [
    {
        path: 'new',
        component: ProjectEditComponent,
        canActivate: [UserAuthGuardService]
    },
    {
        path: ':id',
        component: ProjectComponent
    },
    {
        path: ':id/edit',
        component: ProjectEditComponent,
        canActivate: [UserAuthGuardService]
    },
    {
        path: '',
        component: ProjectMainComponent
    }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);

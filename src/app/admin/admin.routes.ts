import { ContactsListComponent } from './contacts-list/contacts-list.component';
import { NewsEditComponent } from './news-edit/news-edit.component';
import { NewsListComponent } from './news-list/news-list.component';
import { ProjectsListComponent } from './projects-list/projects-list.component';
import { ProjectsEditComponent } from './projects-edit/projects-edit.component';

import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path: 'projects',
        component: ProjectsListComponent,
        children: [
            {
                path: ':id',
                component: ProjectsEditComponent
            }
        ]
    },
    {
        path: 'contacts',
        component: ContactsListComponent
    },
    {
        path: 'news',
        component: NewsListComponent
    },
    {
        path: '',
        redirectTo: 'projects'
    }         
]

export const routing: ModuleWithProviders = RouterModule.forChild(routes);

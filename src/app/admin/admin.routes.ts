import { ContactsListComponent } from './contacts-list/contacts-list.component';
import { NewsEditComponent } from './news-edit/news-edit.component';
import { NewsListComponent } from './news-list/news-list.component';
import { ProjectsListComponent } from './projects-list/projects-list.component';

import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path: 'contacts',
        component: ContactsListComponent
    },
    {
        path: 'news/:id',
        component: NewsEditComponent
    },
    {
        path: 'news',
        component: NewsListComponent
    },
    {
        path: '',
        component: ProjectsListComponent
    }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);

import { NewsListComponent } from './news-list/news-list.component';
import { NewsComponent } from './news/news.component';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        component: NewsListComponent
    },
    {
        path: ':id',
        component: NewsComponent
    }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);

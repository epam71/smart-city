import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthCallbackComponent } from './auth-callback/auth-callback.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { NavigationComponent } from './navigation/navigation.component';
import { NewsComponent } from './news/news.component';
import { ProjectsComponent } from './projects/projects.component';
import { StaticComponent } from './static/static.component';

import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [

];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
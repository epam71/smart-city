import { RouterModule } from '@angular/router';
import { AuthCallbackComponent } from './components/auth-callback/auth-callback.component';
import { StaticComponent } from './components/static/static.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AdminAuthGuardService } from './core/admin-auth-guard/admin-auth-guard.service';
import { UserAuthGuardService } from './core/admin-auth-guard/user-auth-guard.service';
import { AboutUsComponent } from './components/about-us/about-us.component';

export const AppRoutes = RouterModule.forRoot([
    {
        path: '',
        component: StaticComponent
    },
    {
        path: 'about',
        component: AboutUsComponent
    },
    {
        path: 'admin',
        loadChildren: './admin/admin.module#AdminModule',
        canLoad: [AdminAuthGuardService]
    },
    {
        path: 'projects',
        loadChildren: './projects/projects.module#ProjectsModule'
    },
    {
        path: 'news',
        loadChildren: './news/news.module#NewsModule'
    },
    {
        path: 'auth/callback',
        component: AuthCallbackComponent
    },
    {
        path: 'not-found',
        component: PageNotFoundComponent
    },
    {
        path: 'redirectToRoot',
        redirectTo: '/'
    },
    {
        path: '**',
        redirectTo: 'not-found'
    }
]);

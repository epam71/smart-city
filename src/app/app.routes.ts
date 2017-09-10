import { RouterModule } from '@angular/router';
import { AuthCallbackComponent } from './components/auth-callback/auth-callback.component';

export const AppRoutes = RouterModule.forRoot([
    {
        path: 'admin',
        loadChildren: './admin/admin.module#AdminModule'
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
    }
]);

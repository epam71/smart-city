import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AchivementComponent } from './achivement/achivement.component';
import { AuthCallbackComponent } from './auth-callback/auth-callback.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { NavigationComponent } from './navigation/navigation.component';
import { NewsComponent } from './news/news.component';
import { ProjectsComponent } from './projects/projects.component';
import { SignupComponent } from './signup/signup.component';
import { StaticComponent } from './static/static.component';
import { routing } from './components.routes';


@NgModule({
  imports: [
    CommonModule,
    routing
  ],
  declarations: [
      AchivementComponent,
      AuthCallbackComponent,
      ContactUsComponent,
      NavigationComponent,
      NewsComponent,
      ProjectsComponent,
      SignupComponent,
      StaticComponent
    ]
})
export class ComponentModule { }

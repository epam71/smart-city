import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";

import { CoreModule } from './core/core.module';
import { PipesModule } from './pipes/pipes.module';

import { StaticComponent } from './components/static/static.component';
import { AppComponent } from './app.component';
import { NewsComponent } from './components/news/news.component';
import { AchivementComponent } from './components/achivement/achivement.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { FooterComponent } from './components/footer/footer.component';
import { SignupComponent } from './components/signup/signup.component';
import { AuthCallbackComponent } from './components/auth-callback/auth-callback.component';
import { AppRoutes } from './app.routes';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { AlertModule } from 'ngx-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    NewsComponent,
    AchivementComponent,
    ProjectsComponent,
    SignupComponent,
    AuthCallbackComponent,
    StaticComponent,
    FooterComponent,
    ContactUsComponent,
    NavigationComponent,
  ],
  imports: [
    BrowserModule,
    CoreModule,
    PipesModule,
    AppRoutes,
    FormsModule,
    BrowserAnimationsModule,
    AlertModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 
  
}

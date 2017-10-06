import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";

import { CoreModule } from './core/core.module';
import { PipesModule } from './pipes/pipes.module';

import { StaticComponent } from './components/static/static.component';
import { AppComponent } from './app.component';
import { NewsComponent } from './components/news/news.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { FooterComponent } from './components/footer/footer.component';
import { AuthCallbackComponent } from './components/auth-callback/auth-callback.component';
import { AppRoutes } from './app.routes';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { AlertModule } from 'ngx-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminAuthGuardService } from './core/admin-auth-guard/admin-auth-guard.service';
import { OrderModule } from 'ngx-order-pipe';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { config } from './core/config';
import { UserAuthGuardService } from './core/admin-auth-guard/user-auth-guard.service';

@NgModule({
  declarations: [
    AppComponent,
    NewsComponent,
    PageNotFoundComponent,
    ProjectsComponent,
    AuthCallbackComponent,
    StaticComponent,
    FooterComponent,
    ContactUsComponent,
    NavigationComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    PipesModule,
    AppRoutes,
    FormsModule,
    BrowserAnimationsModule,
    AlertModule.forRoot(),
    OrderModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(config.firebase)
  ],
  providers: [AdminAuthGuardService, UserAuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { 
  
}

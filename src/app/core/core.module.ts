import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';

import { AuthServiceService } from './auth-service/auth-service.service';
import { ContactServiceService } from './contact-service/contact-service.service';
import { NewsServiceService } from './news-service/news-service.service';
import { ProjectServiceService } from './project-service/project-service.service';
import { UserServiceService } from './user-service/user-service.service';

@NgModule({
  imports: [
    CommonModule,
    HttpModule
  ],
  declarations: [],
  providers: [
    AuthServiceService,
    ContactServiceService,
    NewsServiceService,
    ProjectServiceService,
    UserServiceService
  ]
})
export class CoreModule { }

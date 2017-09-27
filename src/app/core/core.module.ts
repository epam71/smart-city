import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';

import { AuthService } from './auth-service/auth-service.service';
import { ContactServiceService } from './contact-service/contact-service.service';
import { NewsServiceService } from './news-service/news-service.service';
import { ProjectServiceService } from './project-service/project-service.service';
import { EmailServiceService } from './email-service/email-service.service';


@NgModule({
  imports: [
    CommonModule,
    HttpModule
  ],
  declarations: [],
  providers: [
    AuthService,
    ContactServiceService,
    NewsServiceService,
    ProjectServiceService,
    EmailServiceService
  ]
})
export class CoreModule { }

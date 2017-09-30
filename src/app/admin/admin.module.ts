import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactsListComponent } from './contacts-list/contacts-list.component';
import { NewsEditComponent } from './news-edit/news-edit.component';
import { NewsListComponent } from './news-list/news-list.component';
import { ProjectsListComponent } from './projects-list/projects-list.component';
import { routing } from './admin.routes';
import { ProjectsEditComponent } from './projects-edit/projects-edit.component';
import { ConfirmComponent } from './confirm/confirm.component';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { NavigationComponent } from './navigation/navigation.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PipesModule } from '../pipes/pipes.module'


@NgModule({
  imports: [
    CommonModule,
    routing,
    FormsModule,
    NgxPaginationModule,
    PipesModule
  ],
  declarations: [
    ContactsListComponent,
    NewsListComponent,
    NewsEditComponent,
    ProjectsListComponent,
    ProjectsEditComponent,
    ConfirmComponent,
    NavigationComponent,
    DashboardComponent
  ]
})
export class AdminModule { }



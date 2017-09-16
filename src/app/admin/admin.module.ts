import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactsListComponent } from './contacts-list/contacts-list.component';
import { NewsEditComponent } from './news-edit/news-edit.component';
import { NewsListComponent } from './news-list/news-list.component';
import { ProjectsListComponent } from './projects-list/projects-list.component';
import { routing } from './admin.routes';
import { FilterApprovalPipe } from "../pipes/filter-approval.pipe";
import { FilterStatusPipe } from "../pipes/filter-status.pipe";
import { ShortenPipe } from '../pipes/shorten.pipe';
import { SortBy } from '../pipes/filter-rating.pipe'
import { ProjectsEditComponent } from './projects-edit/projects-edit.component';
import { ConfirmComponent } from './confirm/confirm.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  imports: [
    CommonModule,
    routing,
    FormsModule
  ],
  declarations: [
    ContactsListComponent,
    NewsListComponent,
    NewsEditComponent,
    ProjectsListComponent,
    FilterApprovalPipe,
    FilterStatusPipe,
    ShortenPipe,
    ProjectsEditComponent,
    ConfirmComponent,
    SortBy
  ]
})
export class AdminModule { }



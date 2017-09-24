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
import { SortBy } from '../pipes/sorting.pipe'
import { ProjectsEditComponent } from './projects-edit/projects-edit.component';
import { ConfirmComponent } from './confirm/confirm.component';
import { FormsModule } from '@angular/forms';
import { MessageStatusPipe } from '../pipes/message-status.pipe';
import { searchNews } from '../pipes/search-news.pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { SetAccesComponent } from './set-acces/set-acces.component';
import { NavigationComponent } from './navigation/navigation.component';

@NgModule({
  imports: [
    CommonModule,
    routing,
    FormsModule,
    NgxPaginationModule
  ],
  declarations: [
    ContactsListComponent,
    NewsListComponent,
    NewsEditComponent,
    ProjectsListComponent,
    FilterApprovalPipe,
    FilterStatusPipe,
    ShortenPipe,
    MessageStatusPipe,
    ProjectsEditComponent,
    ConfirmComponent,
    SortBy,
    searchNews,
    SetAccesComponent,
    NavigationComponent
  ]
})
export class AdminModule { }



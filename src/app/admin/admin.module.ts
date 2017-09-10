import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactsListComponent } from './contacts-list/contacts-list.component';
import { NewsEditComponent } from './news-edit/news-edit.component';
import { NewsListComponent } from './news-list/news-list.component';
import { ProjectsListComponent } from './projects-list/projects-list.component';
import { routing } from './admin.routes';


@NgModule({
  imports: [
    CommonModule,
    routing
  ],
  declarations: [ContactsListComponent, NewsListComponent, NewsEditComponent, ProjectsListComponent]
})
export class AdminModule { }

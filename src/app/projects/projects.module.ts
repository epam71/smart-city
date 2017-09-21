import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsListComponent } from './projects-list/projects-list.component';
import { ProjectComponent } from './project/project.component';
import { ProjectEditComponent } from './project-edit/project-edit.component';
import { routing } from './projects.routes';
import { RatingProjectComponent } from './project-rating/project-rating.component';
import { FilterUser } from '../pipes/filter-user-projects.pipe';
import { CommentsProjectComponent } from './project-comments/project-comments.component';
import { SortBy } from '../pipes/sorting.pipe';
import { FormsModule } from '@angular/forms';
import { ShortenPipe } from '../pipes/shorten.pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { PipesModule } from '../pipes/pipes.module';
import { FilterApprovalPipe } from '../pipes/filter-approval.pipe';
import { SearchBy } from '../pipes/search.pipe';


@NgModule({
  imports: [
    CommonModule,
    routing,
    FormsModule,
    NgxPaginationModule,
  ],
  declarations: [RatingProjectComponent,
    CommentsProjectComponent,
    ProjectsListComponent,
    ProjectComponent,
    ProjectEditComponent,
    FilterUser,
    ShortenPipe,
    SortBy,
    SearchBy,
    FilterApprovalPipe
  ]
})
export class ProjectsModule { }

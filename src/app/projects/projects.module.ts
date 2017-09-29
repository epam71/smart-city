import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsListComponent } from './projects-list/projects-list.component';
import { ProjectComponent } from './project/project.component';
import { ProjectEditComponent } from './project-edit/project-edit.component';
import { routing } from './projects.routes';
import { RatingProjectComponent } from './project-rating/project-rating.component';
import { CommentsProjectComponent } from './project-comments/project-comments.component';
import { SortBy } from '../pipes/sorting.pipe';
import { FormsModule } from '@angular/forms';
import { ShortenPipe } from '../pipes/shorten.pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { PipesModule } from '../pipes/pipes.module';
import { ProjectMainComponent } from './project-main/main-projects.component';


@NgModule({
  imports: [
    CommonModule,
    routing,
    FormsModule,
    NgxPaginationModule,
    InfiniteScrollModule
  ],
  declarations: [RatingProjectComponent,
    CommentsProjectComponent,
    ProjectsListComponent,
    ProjectComponent,
    ProjectEditComponent,
    ProjectMainComponent,
    ShortenPipe,
    SortBy,
  ]
})
export class ProjectsModule { }

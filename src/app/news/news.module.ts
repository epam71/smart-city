import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsListComponent } from './news-list/news-list.component';
import { NewsAddComponent } from './news-add/news-add.component';
import { NewsComponent } from './news/news.component';
import { NewsLikeComponent } from './news-like/news-like.component';
import { NewsCommentComponent } from './news-comment/news-comment.component';
import { routing } from './news.routes';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { PipesModule } from '../pipes/pipes.module';
import { DirectivesModule } from '../directives/directives.module';

@NgModule({
  imports: [
    CommonModule,
    routing,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    PipesModule,
    DirectivesModule
  ],
  declarations: [NewsListComponent, 
    NewsComponent, 
    NewsAddComponent,
    NewsLikeComponent,
    NewsCommentComponent
 ]
})
export class NewsModule { }

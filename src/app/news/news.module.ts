import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsListComponent } from './news-list/news-list.component';
import { NewsAddComponent } from './news-add/news-add.component';
import { NewsComponent } from './news/news.component';
import { NewsLikeComponent } from './news-like/news-like.component';
import { NewsCommentComponent } from './news-comment/news-comment.component';
import { routing } from './news.routes';
import { TruncatePipe } from '../pipes/truncate-news.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { searchNews } from '../pipes/search-news.pipe';
import { NgxPaginationModule } from 'ngx-pagination';

import { SortBy } from '../pipes/sorting.pipe';

@NgModule({
  imports: [
    CommonModule,
    routing,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ],
  declarations: [NewsListComponent, 
    NewsComponent, 
    NewsAddComponent,
    NewsLikeComponent,
    NewsCommentComponent, 
    TruncatePipe,
    searchNews,
   
    SortBy
  ]
})
export class NewsModule { }

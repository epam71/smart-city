import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SortBy } from './sorting.pipe';
import { FilterApprovalPipe } from "./filter-approval.pipe";
import { FilterStatusPipe } from "./filter-status.pipe";
import { ShortenPipe } from './shorten.pipe';
import { MessageStatusPipe } from './message-status.pipe';
import { searchNews } from './search-news.pipe';
import { TruncatePipe } from './truncate-news.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    SortBy,
    FilterApprovalPipe,
    FilterStatusPipe,
    ShortenPipe,
    MessageStatusPipe,
    searchNews,
    TruncatePipe
  ],
  exports: [
    SortBy,
    FilterApprovalPipe,
    FilterStatusPipe,
    ShortenPipe,
    MessageStatusPipe,
    searchNews,
    TruncatePipe
  ]
})
export class PipesModule { }
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SortBy } from './sorting.pipe';
import { FilterApprovalPipe } from "./filter-approval.pipe";
import { FilterStatusPipe } from "./filter-status.pipe";
import { ShortenPipe } from './shorten.pipe';
import { MessageStatusPipe } from './message-status.pipe';
import { searchNews } from './search-news.pipe';

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
    searchNews
  ],
  exports: [
    SortBy,
    FilterApprovalPipe,
    FilterStatusPipe,
    ShortenPipe,
    MessageStatusPipe,
    searchNews
  ]
})
export class PipesModule { }
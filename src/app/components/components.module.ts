import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routing } from './components.routes';
import { PipesModule } from '../pipes/pipes.module';
import { CarouselComponent } from './carousel/carousel.component';
import { Slide } from './about-us/slide.component';

@NgModule({
  imports: [
    CommonModule,
    routing,
    PipesModule
  ],
  declarations: []
})
export class ComponentsModule { }

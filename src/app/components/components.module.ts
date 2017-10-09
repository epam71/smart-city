import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthCallbackComponent } from './auth-callback/auth-callback.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { NavigationComponent } from './navigation/navigation.component';
import { NewsComponent } from './news/news.component';
import { ProjectsComponent } from './projects/projects.component';
import { StaticComponent } from './static/static.component';
import { routing } from './components.routes';
import { PipesModule } from '../pipes/pipes.module';
import { AboutUsComponent } from './about-us/about-us.component';
import { CarouselComponent } from './carousel/carousel.component';
import { Slide } from './about-us/slide.component';

@NgModule({
  imports: [
    CommonModule,
    routing,
    PipesModule
  ],
  declarations: [
    PageNotFoundComponent,
      AuthCallbackComponent,
      ContactUsComponent,
      NavigationComponent,
      NewsComponent,
      ProjectsComponent,
      StaticComponent,
      AboutUsComponent
    ]
})
export class ComponentsModule { }

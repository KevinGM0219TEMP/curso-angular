import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { MediaPlayerComponent } from './components/media-player/media-player.component';
import { HeaderUserComponent } from './components/header-user/header-user.component';
import { SectionGenericComponent } from './components/section-generic/section-generic.component';
import { CardPlayerComponent } from './components/card-player/card-player.component';
import { AppRoutingModule } from "src/app/app-routing.module";
import { RouterModule } from '@angular/router';
import { PlayListHeaderComponent } from './components/play-list-header/play-list-header.component';
import { PlayListBodyComponent } from './components/play-list-body/play-list-body.component';
import { PipeOrdenarTracksPipe } from './pipes/pipe-ordenar-tracks.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImgBrokenDirective } from './directives/img-broken.directive';
import { LifecycleDemoComponent } from './components/lifecycle-demo/lifecycle-demo.component';
import { LifecycleChildComponent } from './components/lifecycle-child/lifecycle-child.component';



@NgModule({
  declarations: [
    SidebarComponent,
    MediaPlayerComponent,
    HeaderUserComponent,
    SectionGenericComponent,
    CardPlayerComponent,
    PlayListHeaderComponent,
    PlayListBodyComponent,
    PipeOrdenarTracksPipe,
    ImgBrokenDirective,
    LifecycleDemoComponent,
    LifecycleChildComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
],
  exports: [
    SidebarComponent,
    MediaPlayerComponent,
    HeaderUserComponent,
    SectionGenericComponent,
    CardPlayerComponent,
    PlayListHeaderComponent,
    PlayListBodyComponent,
    ImgBrokenDirective,
    FormsModule,
    ReactiveFormsModule,
    
  ]
})
export class SharedModule { }

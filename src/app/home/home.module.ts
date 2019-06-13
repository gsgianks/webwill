import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { HomeRoutingModule } from './/home-routing.module';
import { HomeContainerComponent } from './home-container.component';
import { HomeOption2Component } from './home-option2/home-option2.component';
import { MaterialModule } from '../material.module';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    MaterialModule
  ],
  declarations: [HomeComponent, HomeContainerComponent, HomeOption2Component]
})
export class HomeModule { }

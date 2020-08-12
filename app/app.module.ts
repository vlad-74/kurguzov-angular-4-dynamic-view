import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { MaterialModule } from './modules/material.module';

import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { SecondComponent } from './components/second/second.component';
import { ChildComponent } from './components/child/child.component';
import { RendererComponent } from './components/renderer/renderer.component';
import { ThirdComponent } from './components/third/third.component';
import { InputComponent } from './components/renderer/input/input.component';

const routes: Routes = [
  { path: 'main', component: MainComponent},
  { path: '', redirectTo: 'main', pathMatch: 'full' }
];

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes)
  ],
  declarations: [
    AppComponent,
    MainComponent,
    SecondComponent,
    ChildComponent,
    RendererComponent,
    ThirdComponent,
    InputComponent,
  ],
  entryComponents: [
    ChildComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

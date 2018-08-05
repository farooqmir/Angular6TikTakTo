import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TiktaktoeComponent, SquareComponent } from './feature/tiktaktoe/tiktaktoe.component';


@NgModule({
  declarations: [
    AppComponent,
    TiktaktoeComponent,
    SquareComponent

  ],
  imports: [
    BrowserModule  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

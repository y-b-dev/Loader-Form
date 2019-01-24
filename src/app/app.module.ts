import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LayoutModule } from '@angular/cdk/layout';

import { SliderModule } from '@syncfusion/ej2-angular-inputs';

import { OnlyNumber } from './only-numbers-directive';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    OnlyNumber,
  ],
  imports: [
    BrowserModule,
    SliderModule,
    FormsModule,
    LayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
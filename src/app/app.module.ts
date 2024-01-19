import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
	imports: [CommonModule, BrowserModule, BrowserAnimationsModule],
	declarations: [AppComponent],
})
export class AppModule {}

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TodoCollectionComponent } from './components/todo-collection/todo-collection.component';
import { TodoGroupComponent } from './components/todo-group/todo-group.component';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PrimeNGConfig } from 'primeng/api';

@Component({
	selector: 'app-root',
	standalone: true,
	templateUrl: './app.component.html',
	imports: [
		CommonModule,
		RouterOutlet,
		TodoGroupComponent,
		TodoCollectionComponent,
	],
	providers: [BrowserAnimationsModule, BrowserModule],
})
export class AppComponent implements OnInit {
	constructor(private primengConfig: PrimeNGConfig) {}

	ngOnInit() {
		this.primengConfig.ripple = true;
		this.primengConfig.zIndex = {
			modal: 1100, // dialog, sidebar
			overlay: 1000, // dropdown, overlaypanel
			menu: 1000, // overlay menus
			tooltip: 1100, // tooltip
		};
	}
}

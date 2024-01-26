import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TodoGroupComponent } from './components/todo-group/todo-group.component';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { Subscription } from 'rxjs';
import { ToastService } from './services/toast.service';
import { AuthService } from './services/auth.service';

@Component({
	selector: 'app-root',
	standalone: true,
	templateUrl: './app.component.html',
	imports: [CommonModule, RouterOutlet, TodoGroupComponent, ToastModule],
	providers: [
		BrowserAnimationsModule,
		BrowserModule,
		MessageService,
		ToastService,
		// AuthService
	],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppComponent implements OnInit {
	private toastSubscription!: Subscription;

	constructor(
		private messageService: MessageService,
		private toastService: ToastService,
		private primengConfig: PrimeNGConfig,
		// private authService: AuthService
	) {
		this.toastSubscription = this.toastService
			.getToastObservable()
			.subscribe((toast) => {
				this.messageService.add({
					severity: toast.severity,
					summary: toast.summary,
					detail: toast.detail,
				});
			});
	}
	ngOnDestroy() {
		this.toastSubscription.unsubscribe();
	}
	ngOnInit() {
		// if(localStorage.getItem('token'))
		// this.authService.login(localStorage.getItem('token'))

		this.primengConfig.ripple = true;
		this.primengConfig.zIndex = {
			modal: 1100, // dialog, sidebar
			overlay: 1000, // dropdown, overlaypanel
			menu: 1000, // overlay menus
			tooltip: 1100, // tooltip
		};
	}
}

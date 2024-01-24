import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, Component, OnDestroy } from '@angular/core';
import {
	FormControl,
	FormGroup,
	ReactiveFormsModule,
	Validators,
} from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { ToastService } from '../../services/toast.service';

@Component({
	selector: 'app-login',
	standalone: true,
	imports: [ReactiveFormsModule, CommonModule, HttpClientModule, ToastModule],
	providers: [
		HttpClient,
		HttpClientModule,
		AuthService,
		MessageService,
		ToastService,
	],
	templateUrl: './login.component.html',
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class LoginComponent  {
	userData: FormGroup;
	private toastSubscription!: Subscription;

	constructor(
		private readonly authService: AuthService,
		private toastService: ToastService,
		private messageService: MessageService
	) {
		this.userData = new FormGroup({
			email: new FormControl('', [Validators.required, Validators.email]),
			password: new FormControl('', [
				Validators.required,
				Validators.minLength(6),
			]),
		});
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

	onSubmit() {
		if (this.userData.valid) {
			console.log(this.userData.value);
			this.authService.login(this.userData.value);
		} else {
			console.log('error');
		}
	}

	ngOnDestroy() {
		this.toastSubscription.unsubscribe();
	}
}

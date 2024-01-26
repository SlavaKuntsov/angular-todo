import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import {
	FormControl,
	FormGroup,
	ReactiveFormsModule,
	Validators,
} from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';
import { ToastService } from '../../services/toast.service';

@Component({
	selector: 'app-signup',
	standalone: true,
	imports: [HttpClientModule, ReactiveFormsModule, CommonModule],
	providers: [HttpClient, HttpClientModule, AuthService, MessageService],
	templateUrl: './signup.component.html',
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SignupComponent  {
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
			this.authService.signUp(this.userData.value);
		} else {
			console.log('error');
		}
	}

	ngOnDestroy() {
		this.toastSubscription.unsubscribe();
	}
}
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

@Component({
	selector: 'app-signup',
	standalone: true,
	imports: [HttpClientModule, ReactiveFormsModule, CommonModule],
	providers: [HttpClient, HttpClientModule, AuthService, MessageService],
	templateUrl: './signup.component.html',
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SignupComponent {
	userData: FormGroup;

	constructor(private readonly authService: AuthService) {
		this.userData = new FormGroup({
			email: new FormControl('', [Validators.required, Validators.email]),
			password: new FormControl('', [
				Validators.required,
				Validators.minLength(6),
			]),
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
}

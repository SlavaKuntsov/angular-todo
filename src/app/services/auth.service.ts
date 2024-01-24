import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable, effect, signal } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { catchError, map, tap } from 'rxjs';
import { IAuthUser, IUser } from '../interfaces/user.interface';
import { ToastService } from './toast.service';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	isAuthSig = signal<boolean>(false);

	constructor(
		@Inject(HttpClient) private readonly http: HttpClient,
		private messageService: MessageService,
		private toastService: ToastService,
		private router: Router
	) {
		effect(() => {
			if (this.isAuthSig()) {
				router.navigate(['/']);
			}
		});
	}

	signUp(userData: IAuthUser) {
		return this.http
			.post('https://localhost:7034/Users/SignUp', userData)
			.pipe(
				catchError((err) => {
					console.log('error');
					this.handleError(err);
					throw new Error(err.message);
				})
			)
			.subscribe(() => {
				console.log(userData);
				this.messageService.add({
					severity: 'success',
					summary: 'Success',
					detail: 'Create user',
				});
			});
	}

	login(userData: IAuthUser) {
		console.log('login');
		return this.http
			.post<IUser>('https://localhost:7034/Users/Login', userData)
			.pipe(
				map((res: Object) => res as IUser),
				tap((res: IUser) => {
					console.log('res: ', res);
					this.toastService.showToast(
						'success',
						'Success',
						'Login successful'
					);
					
					localStorage.setItem('token', res.token);
				}),
				catchError((err) => {
					this.handleError(err);
					throw new Error(err.message);
				})
			)
			.subscribe(() => {
				console.log(userData);
				this.isAuthSig.set(true);
			});
	}

	private handleError(err: HttpErrorResponse): void {
		console.log(err);
		this.toastService.showToast('warn', 'Error', err.error);
	}
}

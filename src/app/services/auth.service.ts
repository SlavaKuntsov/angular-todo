import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable, effect, signal } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { catchError, map, tap } from 'rxjs';
import {
	IAuthUserCreate,
	IAuthUserLogin,
	IUser,
} from '../interfaces/user.interface';
import { ToastService } from './toast.service';
import { environment } from '../../environments/environment'

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	isAuthSig = signal<boolean>(false);
	#URL_PATH!: string;

	constructor(
		@Inject(HttpClient) private readonly http: HttpClient,
		private messageService: MessageService,
		private toastService: ToastService,
		private router: Router
	) {
		this.#URL_PATH = "https://angular-todo-backend.onrender.com";
		effect(() => {
			if (this.isAuthSig()) {
				router.navigate(['/']);
			}
		});
	}

	signUp(userData: IAuthUserCreate) {
		console.log('signup');
		return this.http
			.post<IUser>(`${this.#URL_PATH}/Users/Create`, userData, { })
			.pipe(
				map((res: Object) => res as string),
				tap((token: string) => {
					console.log('token: ', token);
					this.toastService.showToast(
						'success',
						'Success',
						'Create user successful'
					);
					localStorage.setItem('token', token);
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

	login(userData: IAuthUserLogin) {
		console.log('userData login: ', userData);
		return this.http
			.post<IUser>('https://angular-todo-backend.onrender.com/Users/Login', userData)
			.pipe(
				map((res: Object) => res as IUser),
				tap((res: IUser) => {
					console.log('res: ', res);
					this.toastService.showToast(
						'success',
						'Success',
						'Login successful'
					);

					// localStorage.setItem('token', );
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

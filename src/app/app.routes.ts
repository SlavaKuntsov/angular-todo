import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { MainComponent } from './pages/main/main.component';
import { SignupComponent } from './pages/signup/signup.component';
import { AuthComponent } from './pages/auth/auth.component';

export const routes: Routes = [
	{ path: '', component: MainComponent },
	{ path: 'auth', redirectTo: 'auth/login', pathMatch: 'full' },
	{
		path: 'auth',
		component: AuthComponent,
		children: [
			{ path: 'login', component: LoginComponent, title: 'Login' },
			{ path: 'signup', component: SignupComponent, title: 'SignUp' },
		],
	},
];

import { Routes } from '@angular/router';
import { AuthComponent } from './pages/auth/auth.component';
import { MainComponent } from './pages/main/main.component';

export const routes: Routes = [
	{path: '', component: MainComponent},
	{path: 'auth', component: AuthComponent},
];

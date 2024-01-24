import { Component, Directive, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { SignupComponent } from '../signup/signup.component';

@Component({
	selector: 'app-auth',
	standalone: true,
	imports: [LoginComponent, SignupComponent],
	templateUrl: './auth.component.html',
	styles: ``,
})
export class AuthComponent implements OnInit {
	currentPath!: string;

	constructor(private router: Router) {}

	ngOnInit() {
		this.currentPath = this.router.url;
	}
}

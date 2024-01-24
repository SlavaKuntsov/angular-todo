import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Subject } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class ToastService {
	private toastSubject = new Subject<any>();

	constructor(private messageService: MessageService) {}

	showToast(severity: string, summary: string, detail: string) {
		this.toastSubject.next({ severity, summary, detail });
	}

	getToastObservable() {
		return this.toastSubject.asObservable();
	}
}

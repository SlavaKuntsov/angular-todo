import { CommonModule } from '@angular/common';
import {
	CUSTOM_ELEMENTS_SCHEMA,
	Component,
	DoCheck,
	OnInit,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TodoGroupComponent } from '../../components/todo-group/todo-group.component';
import { ITodoGroup } from '../../interfaces/todo.interface';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { Subscription } from 'rxjs';
import {
	IGroupChange,
	IGroupDelete,
	IItemAdd,
	IItemChange,
	IItemDelete,
} from '../../interfaces/todoActions.interface';
import { ToastService } from '../../services/toast.service';

@Component({
	selector: 'app-main',
	standalone: true,
	imports: [
		CommonModule,
		RouterOutlet,
		TodoGroupComponent,
		ConfirmDialogModule,
		ToastModule,
	],
	providers: [
		BrowserAnimationsModule,
		BrowserModule,
		ConfirmationService,
		MessageService,
		ToastService,
	],
	templateUrl: './main.component.html',
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MainComponent implements OnInit, DoCheck {
	// public todoGroups: ITodoGroup[] = [];
	todoGroups: ITodoGroup[] = [];
	private toastSubscription!: Subscription;

	addGroup(): void {
		this.todoGroups.push({
			title: '',
			items: [],
		});
	}

	addItem(item: IItemAdd): void {
		const newItem = { ...item.value }; // Создаем новый объект на основе item.value
		this.todoGroups[item.indexGroup].items!.push(newItem);
		this.sort(item.indexGroup);
	}

	changeGroup(group: IGroupChange): void {
		this.todoGroups[group.indexGroup].title = group.title;
	}

	changeItem(item: IItemChange): void {
		const groupItems = this.todoGroups[item.indexGroup].items;
		if (groupItems && groupItems[item.indexItem]) {
			const groupItem = groupItems[item.indexItem];

			groupItem.title = item.title;
			groupItem.description = item.description;
			groupItem.status = item.status;
			groupItem.order = item.order;
		}
		this.sort(item.indexGroup);
	}

	deleteGroup(group: IGroupDelete): void {
		this.confirmationService.confirm({
			target: group.event.target as EventTarget,
			message: 'Do you want to delete this group?',
			header: 'title',
			icon: 'pi pi-info-circle',
			acceptButtonStyleClass: 'p-button-danger p-button-text',
			rejectButtonStyleClass: 'p-button-text p-button-text',
			acceptIcon: 'none',
			rejectIcon: 'none',

			accept: () => {
				this.messageService.add({
					severity: 'info',
					summary: 'Confirmed',
					detail: 'Record deleted',
				});
				this.todoGroups.splice(group.indexGroup, 1);
			},
			reject: () => {
				this.messageService.add({
					severity: 'error',
					summary: 'Rejected',
					detail: 'You have rejected',
				});
			},
		});
	}

	deleteItem(item: IItemDelete): void {
		console.log('item: ', item);
		this.confirmationService.confirm({
			target: item.event.target as EventTarget,
			message: 'Do you want to delete this record?',
			header: 'Confirmation',
			icon: 'pi pi-info-circle',
			acceptButtonStyleClass: 'p-button-danger p-button-text',
			rejectButtonStyleClass: 'p-button-text p-button-text',
			acceptIcon: 'none',
			rejectIcon: 'none',

			accept: () => {
				this.messageService.add({
					severity: 'info',
					summary: 'Confirmed',
					detail: 'Record deleted',
				});
				this.todoGroups[item.indexGroup].items?.splice(
					item.indexItem,
					1
				);
			},
			reject: () => {
				this.messageService.add({
					severity: 'error',
					summary: 'Rejected',
					detail: 'You have rejected',
				});
			},
		});
	}

	constructor(
		private confirmationService: ConfirmationService,
		private messageService: MessageService,
		private toastService: ToastService
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
	ngOnInit(): void {
		this.sortAll();
	}
	ngDoCheck(): void {}
	// ngOnDestroy() {
	// 	this.toastSubscription.unsubscribe();
	// }
	sort(indexGroup: number): void {
		this.todoGroups[indexGroup].items!.sort((a, b) => a.order - b.order);
	}
	sortAll(): void {
		this.todoGroups.forEach((group: ITodoGroup) => {
			group.items!.sort((a, b) => a.order - b.order);
		});
	}
	// sort(): void {
	// 	console.log('sort');
	// 	this.todoGroups.sort((a, b) => {
	// 		console.log(a, b)
	// 		const statusA = a.items?.[0]?.status; // Предполагая, что status находится в первом элементе массива items
	// 		const statusB = b.items?.[0]?.status;
	// 		console.log(statusA, statusB);

	// 		if (statusA && statusB) {
	// 			return this.compareTypes(statusA, statusB);
	// 		}

	// 		return 0;
	// 	});
	// }
	// compareTypes(a: TodoStatus, b: TodoStatus) {
	// 	console.log('sort');
	// 	const typesOrder = [
	// 		TodoStatus.NOT_STARTED,
	// 		TodoStatus.IN_PROGRESS,
	// 		TodoStatus.COMPLETED,
	// 	];
	// 	console.log('order')
	// 	console.log(typesOrder.indexOf(a) - typesOrder.indexOf(b))
	// 	return typesOrder.indexOf(a) - typesOrder.indexOf(b);
	// }
}

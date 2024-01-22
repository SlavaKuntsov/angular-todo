import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TodoGroupComponent } from '../../components/todo-group/todo-group.component';
import {
	ITodoGroup,
	ITodoItem,
	TodoStatus,
} from '../../interfaces/todo.interface';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';

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
	],
	templateUrl: './main.component.html',
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MainComponent {
	public todoGroups: ITodoGroup[];
	public todoItems: ITodoItem[] = [
		{
			title: 'Todo Item',
			description: 'Todo Item Description',
			status: TodoStatus.NOT_STARTED,
		},
		{
			title: 'Todo Item 2',
			description: 'Todo Item Description 2',
			status: TodoStatus.IN_PROGRESS,
		},
		{
			title: 'Todo Item 3',
			description: 'Todo Item Description 3',
			status: TodoStatus.COMPLETED,
		},
	];
	public todoItems2: ITodoItem[] = [
		{
			title: 'Todo Item',
			description: 'Todo Item Description',
			status: TodoStatus.NOT_STARTED,
		},
		{
			title: 'Todo Item 2',
			description: 'Todo Item Description 2',
			status: TodoStatus.IN_PROGRESS,
		},
		{
			title: 'Todo Item 3',
			description: 'Todo Item Description 3',
			status: TodoStatus.COMPLETED,
		},
	];

	addGroup(): void {
		this.todoGroups.push({
			title: '',
			items: [],
		});
	}

	deleteGroup(event: any): void {
		console.log(2);
		this.confirmationService.confirm({
			target: event.target as EventTarget,
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
				console.log(3);
				this.todoGroups.splice(event.index, 1);
				console.log('event: ', event.index);
			},
			reject: () => {
				this.messageService.add({
					severity: 'error',
					summary: 'Rejected',
					detail: 'You have rejected',
				});
				console.log('no');
			},
		});
	}

	deleteItem(event: any): void {
		this.confirmationService.confirm({
			target: event.event.target as EventTarget,
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
				console.log(event)
				this.todoGroups[event.indexG].items?.splice(event.indexI, 1);

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

	addItem(item: { value: ITodoItem; index: number }): void {
		console.log('item: ', item);
		const newItem = { ...item.value }; // Создаем новый объект на основе item.value
		this.todoGroups[item.index].items!.push(newItem);
	}

	
	constructor(
		private confirmationService: ConfirmationService,
		private messageService: MessageService
	) {
		this.todoGroups = [
			// {
			// 	title: 'Todo Group',
			// 	items: this.todoItems,
			// }
		];
	}
}

import { CommonModule } from '@angular/common';
import {
	CUSTOM_ELEMENTS_SCHEMA,
	Component,
	EventEmitter,
	Input,
	Output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
	ITodoGroup,
	ITodoItem,
	TodoStatus,
} from '../../interfaces/todo.interface';
import { ItemCompletedComponent } from '../todo-item/item-completed/item-completed.component';
import { ItemInProgressComponent } from '../todo-item/item-in-progress/item-in-progress.component';
import { ItemNotStartedComponent } from '../todo-item/item-not-started/item-not-started.component';

import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ToastModule } from 'primeng/toast';

@Component({
	selector: 'app-todo-group',
	standalone: true,
	imports: [
		ItemCompletedComponent,
		ItemInProgressComponent,
		ItemNotStartedComponent,
		CommonModule,
		FormsModule,
		InputTextareaModule,
		ConfirmPopupModule,
		ConfirmDialogModule,
		ToastModule,
		DropdownModule,
	],
	providers: [ConfirmationService, MessageService],
	templateUrl: './todo-group.component.html',
	styles: ``,
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TodoGroupComponent {
	@Input() todoGroup!: ITodoGroup;
	@Input() index!: number;

	@Output() newItemEvent: EventEmitter<{ value: ITodoItem; index: number }> =
		new EventEmitter<{ value: ITodoItem; index: number }>();
	@Output() deleteGroupEvent = new EventEmitter<{
		index: number;
		event: Event;
	}>();
	@Output() deleteItemEvent = new EventEmitter<{
		indexG: number;
		indexI: number;
		event: Event;
	}>();

	title?: string = '';

	newItemTitle!: string;
	newItemObj?: ITodoItem;
	
	itemStatus: any[] | undefined;
	
	selectedItemStatus?: any = {
		name: TodoStatus.NOT_STARTED,
		status: '../../../assets/icons/not-started.svg',
		check: '../../../assets/icons/yellow-check.svg'
	};
	
	constructor(
		private confirmationService: ConfirmationService,
		private messageService: MessageService
		) {
			console.log('selectedItemStatus: ', this.selectedItemStatus);
	}

	onInputChange(event: any): void {
		this.title = event.target.value;
	}
	deleteSpace(): void {
		this.title = this.title?.trim()
		console.log('title: ', this.title);
	}
	newTitle(event: any): void {
		this.newItemTitle = event.target.value;
	}

	addNewItem(): void {
		if (!this.newItemTitle || this.newItemTitle.trim() === '') {
			return;
		}
		this.newItemObj = {
			title: this.newItemTitle.trim(),
			description: 'new item',
			status: this.selectedItemStatus.name,
		};
		console.log('newItemObj: ', this.newItemObj);
		this.newItemEvent.emit({
			value: this.newItemObj,
			index: this.index,
		});

		this.newItemTitle = '';
		this.selectedItemStatus = {
			name: TodoStatus.NOT_STARTED,
			status: '../../../assets/icons/not-started.svg',
			check: '../../../assets/icons/yellow-check.svg'
		};
	}

	deleteGroup(event: Event) {
		this.deleteGroupEvent.emit({
			index: this.index,
			event: event,
		});
	}
	deleteItem(event: any) {
		console.log('del1');
		this.deleteItemEvent.emit({
			indexG: this.index,
			indexI: event.index,
			event: event.event,
		});
	}

	ngOnInit() {
		this.itemStatus = [
			{
				name: TodoStatus.NOT_STARTED,
				status: '../../../assets/icons/not-started.svg',
				check: '../../../assets/icons/yellow-check.svg'
			},
			{
				name: TodoStatus.IN_PROGRESS,
				status: '../../../assets/icons/in-progress.svg',
				check: '../../../assets/icons/in-progress.svg'
			},
			{
				name: TodoStatus.COMPLETED,
				status: '../../../assets/icons/completed.svg',
				check: '../../../assets/icons/completed.svg',
			},
		];
	}
}

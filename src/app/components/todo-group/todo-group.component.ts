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
	TodoOrder,
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
import {
	IGroupChange,
	IGroupDelete,
	IItemAdd,
	IItemChange,
	IItemDelete,
} from '../../interfaces/todoActions.interface';

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

	@Output() addItemEvent = new EventEmitter<IItemAdd>();
	@Output() changeGroupEvent = new EventEmitter<IGroupChange>();
	@Output() changeItemEvent = new EventEmitter<IItemChange>();
	@Output() deleteGroupEvent = new EventEmitter<IGroupDelete>();
	@Output() deleteItemEvent = new EventEmitter<IItemDelete>();

	title: string = '';

	newItemTitle!: string;
	newItemDescription: string = '';
	newOrder!: TodoOrder;
	newItemObj?: ITodoItem;

	itemStatus: any[] | undefined;

	selectedItemStatus?: any = {
		name: TodoStatus.NOT_STARTED,
		status: '../../../assets/icons/not-started.svg',
		check: '../../../assets/icons/yellow-check.svg',
	};

	constructor(
		private confirmationService: ConfirmationService,
		private messageService: MessageService
	) {}

	onInputChangeTitle(event: any): void {}
	deleteSpace(value: string): void {
		value = value!.trim();
	}
	newTitle(event: any): void {
		this.newItemTitle = event.target.value;
	}
	newDescription(event: any): void {
		this.newItemDescription = event.target.value;
	}

	addNewItem(): void {
		if (!this.newItemTitle || this.newItemTitle.trim() === '') {
			return;
		}
		if (
			this.newItemDescription === undefined ||
			this.newItemTitle.trim() === ''
		) {
			return;
		}

		switch (this.selectedItemStatus.name) {
			case TodoStatus.NOT_STARTED:
				this.newOrder = TodoOrder.NOT_STARTED;
				break;
			case TodoStatus.IN_PROGRESS:
				this.newOrder = TodoOrder.IN_PROGRESS;
				break;
			case TodoStatus.COMPLETED:
				this.newOrder = TodoOrder.COMPLETED;
				break;
		}

		this.newItemObj = {
			title: this.newItemTitle.trim(),
			description: this.newItemDescription.trim(),
			status: this.selectedItemStatus.name,
			order: this.newOrder,
		};
		this.addItemEvent.emit({
			value: this.newItemObj,
			indexGroup: this.index,
		});

		this.newItemTitle = '';
		this.newItemDescription = '';
		this.selectedItemStatus = {
			name: TodoStatus.NOT_STARTED,
			status: '../../../assets/icons/not-started.svg',
			check: '../../../assets/icons/yellow-check.svg',
		};
	}

	changeGroup(event: Event): void {
		const inputElement = event.target as HTMLInputElement; // Явно указываем тип как HTMLInputElement
		this.title = inputElement.value;
		this.changeGroupEvent.emit({
			title: this.title,
			indexGroup: this.index,
		});
	}

	changeItem(item: { itemValue: ITodoItem; indexItem: number }): void {
		this.changeItemEvent.emit({
			title: item.itemValue.title,
			description: item.itemValue.description,
			status: item.itemValue.status,
			order: item.itemValue.order,
			indexItem: item.indexItem,
			indexGroup: this.index,
		});
	}

	deleteGroup(event: Event) {
		this.deleteGroupEvent.emit({
			indexGroup: this.index,
			event: event,
		});
	}

	deleteItem(item: any) {
		this.deleteItemEvent.emit({
			indexGroup: this.index,
			indexItem: item.indexItem,
			event: item.event,
		});
	}

	ngOnInit() {
		this.itemStatus = [
			{
				name: TodoStatus.NOT_STARTED,
				status: '../../../assets/icons/not-started.svg',
				check: '../../../assets/icons/yellow-check.svg',
			},
			{
				name: TodoStatus.IN_PROGRESS,
				status: '../../../assets/icons/in-progress.svg',
				check: '../../../assets/icons/in-progress.svg',
			},
			{
				name: TodoStatus.COMPLETED,
				status: '../../../assets/icons/completed.svg',
				check: '../../../assets/icons/completed.svg',
			},
		];
	}
}

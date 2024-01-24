import { Directive, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ITodoItem, TodoOrder, TodoStatus } from '../../../interfaces/todo.interface';

@Directive({})
export class TodoItemBaseComponent implements OnInit {
	@Input() todoItem!: ITodoItem;
	@Input() index!: number;

	@Input() styleClass!: string;

	@Output() changeItemEvent = new EventEmitter<{
		itemValue: ITodoItem;
		indexItem: number;
	}>();
	@Output() deleteItemEvent = new EventEmitter<{
		indexItem: number;
		event: Event;
	}>();

	newItemTitle!: string;
	newItemDescription!: string;
	oldDescription!: string;
	newItemStatus!: TodoStatus;
	newOrder!: TodoOrder;
	inputFocusBool: boolean = false;

	itemStatus: any[] | undefined;

	selectedItemStatus: string = '../../../assets/icons/not-started.svg';

	ngOnInit(): void {
		switch (this.todoItem.status) {
			case TodoStatus.NOT_STARTED:
				this.selectedItemStatus =
					'../../../assets/icons/not-started.svg';
				this.newItemStatus = TodoStatus.NOT_STARTED;
				this.newOrder = TodoOrder.NOT_STARTED
				break;
			case TodoStatus.IN_PROGRESS:
				this.selectedItemStatus =
					'../../../assets/icons/in-progress.svg';
				this.newItemStatus = TodoStatus.IN_PROGRESS;
				this.newOrder = TodoOrder.IN_PROGRESS
				break;
			case TodoStatus.COMPLETED:
				this.selectedItemStatus = '../../../assets/icons/completed.svg';
				this.newItemStatus = TodoStatus.COMPLETED;
				this.newOrder = TodoOrder.COMPLETED
				break;
		}
		this.itemStatus = [
			'../../../assets/icons/not-started.svg',
			'../../../assets/icons/in-progress.svg',
			'../../../assets/icons/completed.svg',
		];

		this.newItemTitle = this.todoItem.title;
		this.newItemDescription = this.todoItem.description;
		this.oldDescription = this.todoItem.description;
	}

	onInputFocus(bool: boolean): void {
		this.inputFocusBool = bool;
		this.newItemTitle = this.newItemTitle?.trim();
		this.newItemDescription = this.newItemDescription?.trim();
		if (bool === false) {
			this.changeItem();
		}
	}

	newTitle(event: any): void {
		this.newItemTitle = event.target.value;
	}
	newDescription(event: any): void {
		this.newItemDescription = event.target.value;
	}
	newStatus(event: any): void {
		switch (this.selectedItemStatus) {
			case '../../../assets/icons/not-started.svg':
				this.styleClass = 'yellow'
				this.newItemStatus = TodoStatus.NOT_STARTED;
				this.newOrder = TodoOrder.NOT_STARTED
				break;
			case '../../../assets/icons/in-progress.svg':
				this.styleClass = 'blue'
				this.newItemStatus = TodoStatus.IN_PROGRESS;
				this.newOrder = TodoOrder.IN_PROGRESS
				break;
			case '../../../assets/icons/completed.svg':
				this.styleClass = 'green'
				this.newItemStatus = TodoStatus.COMPLETED;
				this.newOrder = TodoOrder.COMPLETED
				break;
		}
		this.changeItem();
	}

	changeItem(): void {
		const changeItem: ITodoItem = {
			title: this.newItemTitle,
			description: this.newItemDescription,
			status: this.newItemStatus,
			order: this.newOrder
		};
		this.changeItemEvent.emit({
			itemValue: changeItem,
			indexItem: this.index,
		});
	}

	deleteItem(event: Event): void {
		console.log('delete')
		this.deleteItemEvent.emit({
			indexItem: this.index,
			event: event,
		});
	}
}

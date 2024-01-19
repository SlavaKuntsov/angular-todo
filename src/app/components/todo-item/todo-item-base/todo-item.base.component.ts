import { Component, Directive, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { ITodoItem } from '../../../interfaces/todo.interface';

@Directive({})

export class TodoItemBaseComponent implements OnInit {
	@Input() todoItem!: ITodoItem;
	@Input() index!: number;

	@Output() deleteItemHandler: EventEmitter<{item: ITodoItem, index: number, event: Event}> = new EventEmitter<{item: ITodoItem, index: number, event: Event}>();

	newItemTitle?: string;
	inputFocusBool: boolean = false;

	ngOnInit(): void {
		this.newItemTitle = this.todoItem.title;
	}

	onInputFocus(bool: boolean): void {
		this.inputFocusBool = bool;
		this.newItemTitle = this.newItemTitle?.trim()
	}

	newTitle(event: any): void {
		this.newItemTitle = event.target.value;
	}

	deleteItem(event: Event): void {
		this.deleteItemHandler.emit({
			item: this.todoItem, // можно убрать
			index: this.index,
			event: event
		})
	}
}

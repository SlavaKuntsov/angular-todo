import { ITodoItem, TodoStatus } from "./todo.interface";

export interface IItemAdd {
	value: ITodoItem;
	indexGroup: number;
}

export interface IGroupChange {
	title: string;
	indexGroup: number;
}

export interface IItemChange {
	title: string;
	description: string;
	status: TodoStatus;
	indexItem: number;
	indexGroup: number;
}

export interface IGroupDelete {
	indexGroup: number;
	event: Event;
}

export interface IItemDelete {
	indexGroup: number;
	indexItem: number;
	event: Event;
}

import { ITodoGroup, ITodoItem, TodoOrder, TodoStatus } from "./todo.interface";

export interface IItemAdd {
	value: ITodoItem;
	indexGroup: number;
}

export interface IGroupChange extends ITodoGroup {
	indexGroup: number;
}

export interface IItemChange extends ITodoItem {
	order: TodoOrder;
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

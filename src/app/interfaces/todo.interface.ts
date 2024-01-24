export interface ITodoCollection {
	title: string;
	items?: ITodoGroup[];
}

export interface ITodoGroup {
	title: string;
	items?: ITodoItem[];
}

export interface ITodoItem {
	title: string;
	description: string;
	status: TodoStatus;
	order: TodoOrder;
}

export enum TodoStatus {
	NOT_STARTED = 'Not started',
	IN_PROGRESS = 'In progress',
	COMPLETED = 'Completed',
}

export enum TodoOrder{
	NOT_STARTED = 1,
	IN_PROGRESS = 2,
	COMPLETED = 3,
}
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
}

export enum TodoStatus {
	NOT_STARTED = 'Not started',
	IN_PROGRESS = 'In progress',
	COMPLETED = 'Completed',
}

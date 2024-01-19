import { Component } from '@angular/core';
import { ITodoGroup, TodoStatus } from '../../interfaces/todo.interface';
import { TodoGroupComponent } from "../todo-group/todo-group.component";
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-todo-collection',
    standalone: true,
    templateUrl: './todo-collection.component.html',
    styles: ``,
    imports: [TodoGroupComponent, CommonModule]
})
export class TodoCollectionComponent {
	public TodoGroup: ITodoGroup[];

	constructor() {
		this.TodoGroup = [
			{
				title: 'Todo Group',
				items: [
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
				],
			},
		];
	}
}

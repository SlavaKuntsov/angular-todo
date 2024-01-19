import { Component } from '@angular/core';
import { TodoItemBaseComponent } from '../todo-item-base/todo-item.base.component';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
	selector: 'app-item-not-started',
	standalone: true,
	imports: [InputTextareaModule, CommonModule, FormsModule],
	templateUrl: './item-not-started.component.html',
	styleUrl: '../style.scss',
})
export class ItemNotStartedComponent extends TodoItemBaseComponent {}

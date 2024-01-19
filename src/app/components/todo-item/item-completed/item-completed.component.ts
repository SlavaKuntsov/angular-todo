import { Component } from '@angular/core';
import { TodoItemBaseComponent } from '../todo-item-base/todo-item.base.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputTextareaModule } from 'primeng/inputtextarea';

@Component({
	selector: 'app-item-completed',
	standalone: true,
	imports: [InputTextareaModule, CommonModule, FormsModule],
	templateUrl: './item-completed.component.html',
	styleUrl: '../style.scss',
})
export class ItemCompletedComponent extends TodoItemBaseComponent {}

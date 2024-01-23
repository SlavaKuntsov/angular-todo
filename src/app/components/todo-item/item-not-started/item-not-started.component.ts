import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { TodoItemBaseComponent } from '../todo-item-base/todo-item.base.component';

@Component({
	selector: 'app-item-not-started',
	standalone: true,
	imports: [InputTextareaModule, CommonModule, FormsModule, DropdownModule],
	templateUrl: './item-not-started.component.html',
	styleUrl: '../style.scss',
})
export class ItemNotStartedComponent extends TodoItemBaseComponent {}

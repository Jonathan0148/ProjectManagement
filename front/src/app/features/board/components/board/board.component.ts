import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzCardModule } from 'ng-zorro-antd/card';
import { TranslateModule } from '@ngx-translate/core';
import { DragDropModule, CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../../shared/services/api.service';
import { IProject } from '../../../../shared/interfaces/project.interface';
import { ITask } from '../../../../shared/interfaces/task.interface';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-board',
  imports: [
    CommonModule,
    NzCardModule,
    TranslateModule,
    DragDropModule,
    NzSelectModule,
    FormsModule,
    NzModalModule,
    NzInputModule,
    NzButtonModule
  ],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})
export class BoardComponent implements OnInit {
  projects: IProject[] = [];
  selectedProjectId: number | null = null;
  columns: {
    title: string;
    status: number;
    tasks: ITask[];
  }[] = [
      { title: 'Recibido', status: 1, tasks: [] },
      { title: 'En proceso', status: 2, tasks: [] },
      { title: 'Finalizado', status: 3, tasks: [] },
      { title: 'Revisado', status: 4, tasks: [] }
    ];

  dropListIds: string[] = [];
  isModalVisible = false;
  newTaskName = '';

  constructor(
    private _api: ApiService,
  ) { }

  ngOnInit(): void {
    this.dropListIds = this.columns.map((_, index) => `column-${index}`);
    this._api.get<IProject[]>('projects').subscribe({
      next: (res) => {
        this.projects = res.data || [];
      }
    });
  }

  onSelectProject(projectId: number) {
    this.selectedProjectId = projectId;

    this.columns.forEach(column => column.tasks = []);

    this._api.get<ITask[]>(`tasks/getAllProject/${projectId}`).subscribe({
      next: (res) => {
        const tasks = res.data || [];

        tasks.forEach(task => {
          const column = this.columns.find(c => c.status === task.state);
          if (column) {
            column.tasks.push(task);
          }
        });
      }
    });
  }

  onDrop(event: CdkDragDrop<ITask[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      const task = event.previousContainer.data[event.previousIndex];

      // Mueve la tarea localmente
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      const targetColumn = this.columns.find((_, i) => this.dropListIds[i] === event.container.id);
      const newState = targetColumn?.status;

      if (newState != null) {
        this._api.put(`tasks/${task.id}`, { state: newState }).subscribe({
          next: () => {
            console.log(`Tarea ${task.id} actualizada a estado ${newState}`);
          },
          error: () => {
            console.error('Error al actualizar el estado de la tarea');
          }
        });

        task.state = newState;
      }
    }
  }

  onAddTask(): void {
    if (!this.selectedProjectId) return;

    const newTask = {
      name: 'Nueva tarea',
      projects_id: this.selectedProjectId,
      state: 1
    };

    this._api.post<ITask>('tasks', newTask).subscribe({
      next: (res) => {
        const task = res.data;
        const receivedColumn = this.columns.find(col => col.status === 1);
        if (receivedColumn) {
          receivedColumn.tasks.unshift(task);
        }
      },
      error: () => {
        console.error('Error al crear la tarea');
      }
    });
  }

  openModal(): void {
    this.newTaskName = '';
    this.isModalVisible = true;
  }

  handleCancel(): void {
    this.isModalVisible = false;
  }

  handleCreateTask(): void {
    if (!this.newTaskName.trim() || !this.selectedProjectId) return;

    const newTask = {
      name: this.newTaskName.trim(),
      projects_id: this.selectedProjectId,
      state: 1
    };

    this._api.post<ITask>('tasks', newTask).subscribe({
      next: (res) => {
        const task = res.data;
        const receivedColumn = this.columns.find(col => col.status === 1);
        if (receivedColumn) {
          receivedColumn.tasks.unshift(task);
        }
        this.isModalVisible = false;
      },
      error: () => {
        console.error('Error al crear la tarea');
        this.isModalVisible = false;
      }
    });
  }

  deleteTask(taskId: number, columnStatus: number): void {
    this._api.delete(`tasks/${taskId}`).subscribe({
      next: () => {
        const column = this.columns.find(c => c.status === columnStatus);
        if (column) {
          column.tasks = column.tasks.filter(task => task.id !== taskId);
        }
      },
      error: () => {
        console.error('Error al eliminar la tarea');
      }
    });
  }

}


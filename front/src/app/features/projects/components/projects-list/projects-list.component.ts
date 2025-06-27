import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { ApiService } from '../../../../shared/services/api.service';
import { NzCardModule } from 'ng-zorro-antd/card';
import { TranslateModule } from '@ngx-translate/core';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { IProject } from '../../../../shared/interfaces/project.interface';

@Component({
  selector: 'app-projects-list',
  imports: [
    CommonModule,
    TranslateModule,
    NzTableModule,
    NzTagModule,
    NzButtonModule,
    NzCardModule,
    NzToolTipModule,
    NzIconModule,
    NzPopconfirmModule
  ],
  templateUrl: './projects-list.component.html',
  styleUrl: './projects-list.component.scss'
})
export class ProjectsListComponent implements OnInit {
  projects: any[] = [];
  loading = false;

  constructor(
    private _api: ApiService,
    private router: Router,
    private message: NzMessageService,
  ) { }

  ngOnInit(): void {
    this.getProjects();
  }

  getProjects(): void {
    this.loading = true;
    this._api.get<IProject[]>('projects').subscribe({
      next: (res) => {
        this.projects = res.data || [];
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  onAddProject() {
    this.router.navigate(['/projects/form']);
  }

  onView(project: IProject) {
    this.router.navigate([`/projects/form/view/${project.id}`]);
  }

  onEdit(project: IProject) {
    this.router.navigate([`/projects/form/edit/${project.id}`]);
  }

  onDelete(project: IProject): void {
    this._api.delete(`projects/${project.id}`).subscribe({
      next: () => {
        this.message.success('Proyecto eliminado correctamente');
        this.getProjects();
      },
      error: () => {
        this.message.error('Error al eliminar el proyecto');
      }
    });
  }
}

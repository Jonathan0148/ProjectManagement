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
import { IRole } from '../../../../shared/interfaces/role.interface';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';

@Component({
  selector: 'app-roles-list',
  imports: [
    CommonModule,
    TranslateModule,
    NzTableModule,
    NzTagModule,
    NzButtonModule,
    NzCardModule,
    NzToolTipModule,
    NzIconModule,
    NzPopconfirmModule,
    NzPaginationModule
  ],
  templateUrl: './roles-list.component.html',
  styleUrl: './roles-list.component.scss'
})
export class RoleListComponent implements OnInit {
  roles: any[] = [];
  loading = false;

  constructor(
    private _api: ApiService,
    private router: Router,
    private message: NzMessageService,
  ) { }

  ngOnInit(): void {
    this.getRoles();
  }

  getRoles(): void {
    this.loading = true;
    this._api.get<IRole[]>('roles').subscribe({
      next: (res) => {
        this.roles = res.data || [];
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  onAddRole() {
    this.router.navigate(['/roles/form']);
  }

  onView(role: IRole) {
    this.router.navigate([`/roles/form/view/${role.id}`]);
  }

  onEdit(role: IRole) {
    this.router.navigate([`/roles/form/edit/${role.id}`]);
  }

  onDelete(role: IRole): void {
    this._api.delete(`roles/${role.id}`).subscribe({
      next: () => {
        this.message.success('Rol eliminado correctamente');
        this.getRoles();
      },
      error: () => {
        this.message.error('Error al eliminar el rol');
      }
    });
  }
}

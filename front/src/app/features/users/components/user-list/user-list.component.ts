import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { ApiService } from '../../../../shared/services/api.service';
import { NzCardModule } from 'ng-zorro-antd/card';
import { IUser } from '../../../../shared/interfaces/user.interface';
import { TranslateModule } from '@ngx-translate/core';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';

@Component({
  selector: 'app-user-list',
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
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent implements OnInit {
  users: any[] = [];
  loading = false;

  constructor(
    private _api: ApiService,
    private router: Router,
    private message: NzMessageService,
  ) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.loading = true;
    this._api.get<IUser[]>('users').subscribe({
      next: (res) => {
        this.users = res.data || [];
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  onAddUser() {
    this.router.navigate(['/users/form']);
  }

  onView(user: IUser) {
    this.router.navigate([`/users/form/view/${user.id}`]);
  }

  onEdit(user: IUser) {
    this.router.navigate([`/users/form/edit/${user.id}`]);
  }

  onDelete(user: IUser): void {
    this._api.delete(`users/${user.id}`).subscribe({
      next: () => {
        this.message.success('Usuario eliminado correctamente');
        this.getUsers();
      },
      error: () => {
        this.message.error('Error al eliminar el usuario');
      }
    });
  }
}

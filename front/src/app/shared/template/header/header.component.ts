import { Component, OnInit } from '@angular/core';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from '../../services/api.service';
import { IUser } from '../../interfaces/user.interface';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-header',
  imports: [
    CommonModule,
    RouterModule,
    NzDropDownModule,
    NzIconModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  name: string = "";
  role: string = "";

  constructor(
    private cookieService: CookieService,
    private router: Router,
    private _api: ApiService
  ) { }

  async ngOnInit(): Promise<void> {
    const token = await this.cookieService.get('token');

    const decoded: any = jwtDecode(token);

    this._api.get<IUser>(`users/${decoded.userId}`).subscribe({
      next: (res) => {
        const { data } = res;

        this.name = `${data.names} ${data.surnames}`
        this.role = `${data.role.name}`
      },
      error: (err) => {
        console.error('Error cargando proyecto:', err);
      }
    });
  }

  logout(): void {
    this.cookieService.delete('token', '/');
    this.router.navigate(['/']);
  }
}

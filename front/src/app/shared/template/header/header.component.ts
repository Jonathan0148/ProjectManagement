import { Component } from '@angular/core';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

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
export class HeaderComponent {
  constructor(
    private cookieService: CookieService,
    private router: Router
  ) { }

  logout(): void {
    this.cookieService.delete('token', '/');
    this.router.navigate(['/']);
  }
}

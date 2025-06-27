import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { LoadingButtonDirective } from '../../../../shared/directives/loading-button.directive';
import { NzCardModule } from 'ng-zorro-antd/card';
import { ApiService } from '../../../../core/services/api.service';
import { LoginResponseData } from '../../../../core/interfaces/auth.interface';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  imports: [
    CommonModule,
    TranslateModule,
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzIconModule,
    NzCardModule,
    RouterModule,
    LoadingButtonDirective
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  loading = false;
  showPassword = false;

  private router = inject(Router);
  private fb = inject(FormBuilder);
  private _cookieService = inject(CookieService);
  private _api = inject(ApiService);

  ngOnInit(): void {
    this.form = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      password: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
    });
  }

  submitForm(): void {
    if (this.form.valid) {
      this.loading = true;
      const data = this.form.value;

      this._api.post<LoginResponseData>('auth/login', data).subscribe({
        next: (res) => {
          const token = res.data.token;
          this._cookieService.set('token', token, {
            path: '/',
            secure: true,
            sameSite: 'Lax',
          });
          this.loading = false;
          this.router.navigate(['/users']);
        },
        error: (err) => {
          console.error(err);
          this.loading = false;
        }
      });
    }
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }
}


import { CommonModule, Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { LoadingButtonDirective } from '../../../../shared/directives/loading-button.directive';
import { ApiService } from '../../../../shared/services/api.service';
import { IRole } from '../../../../shared/interfaces/role.interface';
import { IUser } from '../../../../shared/interfaces/user.interface';

@Component({
  selector: 'app-user-form',
  imports: [
    CommonModule,
    TranslateModule,
    ReactiveFormsModule,
    NzButtonModule,
    NzCardModule,
    NzIconModule,
    NzFormModule,
    NzInputModule,
    NzSelectModule,
    NzCheckboxModule,
    LoadingButtonDirective
  ],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss'
})
export class UserFormComponent {
  mode: 'add' | 'edit' | 'view' = 'add';
  id: string | null = null;
  loading = false;
  form!: FormGroup;
  roles: IRole[] = [];

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private _api: ApiService,
    private router: Router,
    private location: Location
  ) {
    const url = this.route.snapshot.url.map(segment => segment.path);

    if (url.includes('view')) {
      this.mode = 'view';
    } else if (url.includes('edit')) {
      this.mode = 'edit';
    } else {
      this.mode = 'add';
    }

    this.id = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      names: ['', Validators.required],
      surnames: ['', Validators.required],
      username: [{ value: '', disabled: true }, Validators.required],
      email: ['', [Validators.email]],
      roles_id: [null, Validators.required],
      active: [true]
    });

    this.getRoles();

    if (this.mode === 'add') {
      this.form.get('names')?.valueChanges.subscribe(() => this.generateUsername());
      this.form.get('surnames')?.valueChanges.subscribe(() => this.generateUsername());
    }

    if (this.mode === 'view' || this.mode === 'edit') {
      this.loadUser();
    }
  }

  submitForm(): void {
    if (this.form.valid) {
      this.loading = true;
      const data = this.form.getRawValue();

      if (this.mode === 'edit' && this.id) {
        this._api.put(`users/${this.id}`, data).subscribe({
          next: () => {
            this.loading = false;
            this.router.navigate(['/users']);
          },
          error: (err) => {
            console.error(err);
            this.loading = false;
          }
        });
      } else {
        this._api.post('users', data).subscribe({
          next: () => {
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
  }

  getRoles() {
    this._api.get<IRole[]>('roles').subscribe({
      next: (res) => {
        this.roles = res.data.length > 0 ? res.data : [];
        this.loading = false;
      }
    });
  }

  loadUser(): void {
    if (!this.id) return;

    this._api.get<IUser>(`users/${this.id}`).subscribe({
      next: (res) => {
        const user = res.data;
        this.form.patchValue({
          names: user.names,
          surnames: user.surnames,
          username: user.username,
          email: user.email,
          roles_id: user.roles_id,
          active: !!user.active
        });

        if (this.mode === 'view') {
          this.form.disable();
        }
      },
      error: (err) => {
        console.error('Error cargando usuario:', err);
      }
    });
  }

  goBack(): void {
    this.location.back();
  }

  generateUsername(): void {
    const names = this.form.get('names')?.value?.trim();
    const surnames = this.form.get('surnames')?.value?.trim();

    if (names && surnames) {
      const firstNameLetter = names.charAt(0).toUpperCase();
      const surnameCapitalized = surnames.charAt(0).toUpperCase() + surnames.slice(1).toLowerCase();

      const generatedUsername = firstNameLetter + surnameCapitalized;

      this.form.get('username')?.setValue(generatedUsername, { emitEvent: false });
    }
  }
}

import { CommonModule, Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzCheckboxComponent, NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { LoadingButtonDirective } from '../../../../shared/directives/loading-button.directive';
import { ApiService } from '../../../../shared/services/api.service';
import { IRole } from '../../../../shared/interfaces/role.interface';
import { IModule } from '../../../../shared/interfaces/module.interface';
import { IPermit } from '../../../../shared/interfaces/permit.interface';
import { NzTableModule } from 'ng-zorro-antd/table';

interface IModuleWithPermits extends IModule {
  selectedPermits: number[];
}
@Component({
  selector: 'app-roles-form',
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
    LoadingButtonDirective,
    NzTableModule,
    NzCheckboxComponent,
    FormsModule
  ],
  templateUrl: './roles-form.component.html',
  styleUrl: './roles-form.component.scss'
})
export class RoleFormComponent {
  mode: 'add' | 'edit' | 'view' = 'add';
  id: string | null = null;
  loading = false;
  form!: FormGroup;
  modules: IModuleWithPermits[] = [];
  permits: IPermit[] = [];
  permitOptions: { label: string, value: number }[] = [];

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
      name: ['', Validators.required],
      description: ['']
    });

    this.loadModulesAndPermits();

    if (this.mode === 'view' || this.mode === 'edit') {
      this.loadRole();
    }
  }

  submitForm(): void {
    if (this.form.valid) {
      this.loading = true;
      const data = this.form.getRawValue();

      const selectedModulePermits = this.modules
        .filter(module => module.selectedPermits.length > 0)
        .map(module => ({
          functionalityId: module.id,
          functionalityRolePermit: module.selectedPermits.map(permitId => ({
            permitId
          }))
        }));

      data.functionalityRole = selectedModulePermits;
      if (this.mode === 'edit' && this.id) {
        this._api.put(`roles/${this.id}`, data).subscribe({
          next: () => {
            this.loading = false;
            this.router.navigate(['/roles']);
          },
          error: (err) => {
            console.error(err);
            this.loading = false;
          }
        });
      } else {
        this._api.post('roles', data).subscribe({
          next: () => {
            this.loading = false;
            this.router.navigate(['/roles']);
          },
          error: (err) => {
            console.error(err);
            this.loading = false;
          }
        });
      }
    }
  }


  loadModulesAndPermits(): void {
    this._api.get<IModule[]>('roles/getModules').subscribe({
      next: (res) => {
        this.modules = res.data.map((mod: any) => ({
          ...mod,
          selectedPermits: []
        }));
      }
    });

    this._api.get<IPermit[]>('roles/getPermits').subscribe({
      next: (res) => {
        this.permits = res.data;
        this.permitOptions = this.permits.map(p => ({ label: p.name, value: p.id }));
      }
    });
  }

  onPermitsChange(selected: number[], module: any): void {
    console.log('Módulo:', module.name, 'Permisos seleccionados:', selected);
  }

  loadRole(): void {
    if (!this.id) return;

    this._api.get<IRole>(`roles/${this.id}`).subscribe({
      next: (res) => {
        const role = res.data;
        this.form.patchValue({
          name: role.name,
          description: role.description
        });

        if (this.mode === 'view') {
          this.form.disable();
        }
      },
      error: (err) => {
        console.error('Error cargando rol:', err);
      }
    });
  }

  onPermitToggle(checked: any, module: any, permit: any): void {
    module.permitSelection[permit.id] = checked;
    console.log(`Permiso ${permit.name} en módulo ${module.name}: ${checked}`);
  }

  goBack(): void {
    this.location.back();
  }
}

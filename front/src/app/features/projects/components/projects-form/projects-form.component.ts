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
import { IProject } from '../../../../shared/interfaces/project.interface';

@Component({
  selector: 'app-projects-form',
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
  templateUrl: './projects-form.component.html',
  styleUrl: './projects-form.component.scss'
})
export class ProjectFormComponent {
  mode: 'add' | 'edit' | 'view' = 'add';
  id: string | null = null;
  loading = false;
  form!: FormGroup;

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
    });

    if (this.mode === 'view' || this.mode === 'edit') {
      this.loadProject();
    }
  }

  submitForm(): void {
    if (this.form.valid) {
      this.loading = true;
      const data = this.form.getRawValue();

      if (this.mode === 'edit' && this.id) {
        this._api.put(`projects/${this.id}`, data).subscribe({
          next: () => {
            this.loading = false;
            this.router.navigate(['/projects']);
          },
          error: (err) => {
            console.error(err);
            this.loading = false;
          }
        });
      } else {
        this._api.post('projects', data).subscribe({
          next: () => {
            this.loading = false;
            this.router.navigate(['/projects']);
          },
          error: (err) => {
            console.error(err);
            this.loading = false;
          }
        });
      }
    }
  }

  loadProject(): void {
    if (!this.id) return;

    this._api.get<IProject>(`projects/${this.id}`).subscribe({
      next: (res) => {
        const project = res.data;
        this.form.patchValue({
          name: project.name
        });

        if (this.mode === 'view') {
          this.form.disable();
        }
      },
      error: (err) => {
        console.error('Error cargando proyecto:', err);
      }
    });
  }

  goBack(): void {
    this.location.back();
  }
}

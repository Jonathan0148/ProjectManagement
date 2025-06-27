import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../shared/template/header/header.component';
import { SideNavComponent } from '../../shared/template/side-nav/side-nav.component';
import { FooterComponent } from '../../shared/template/footer/footer.component';
import { RouterModule, RouterOutlet } from '@angular/router';
import { AsyncPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-common-layout',
  imports: [
    HeaderComponent,
    SideNavComponent,
    FooterComponent,
    RouterOutlet,
    RouterModule,
    NgIf,
    NgClass,
    NgFor,
    AsyncPipe,
    NzBreadCrumbModule,
    NzIconModule
  ],
  templateUrl: './common-layout.component.html',
  styleUrl: './common-layout.component.scss'
})
export class CommonLayoutComponent implements OnInit {
  ngOnInit(): void { }
}

import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { ButtonComponent } from '../../form/button/button.component';
import { BreadcrumbComponent } from '../../ui/breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive, ButtonComponent, BreadcrumbComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  public get currentUser() {
    return this.authService.currentUser();
  }

  public logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}

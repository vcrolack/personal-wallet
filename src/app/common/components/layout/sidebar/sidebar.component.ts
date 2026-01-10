import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive],
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

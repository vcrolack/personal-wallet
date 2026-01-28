import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LucideAngularModule, ChevronRight, Home } from 'lucide-angular';
import { BreadcrumbService } from '../../../../core/services/breadcrumb.service';

export interface BreadcrumbItem {
  label: string;
  url?: string;
  icon?: any;
}

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [CommonModule, RouterLink, LucideAngularModule],
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.css',
})
export class BreadcrumbComponent {
  private breadcrumbService = inject(BreadcrumbService);

  public items = this.breadcrumbService.breadcrumbs;

  public homeIcon = Home;
  public separatorIcon = ChevronRight;
}

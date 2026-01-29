import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ToastService } from './toast.service';
import { NotificationType } from './toast.interface';

@Component({
  selector: 'app-toast',
  imports: [],
  templateUrl: './toast.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToastComponent {
  public readonly toastService = inject(ToastService);
  public readonly toasts = this.toastService.toasts;

  public getStyles(type: NotificationType): string {
    const base = 'bg-surface-raised ';
    const types = {
      info: 'border-primary-500 text-primary-400 bg-primary-500/10',
      success: 'border-success text-success bg-success/10',
      warning: 'border-yellow-500 text-yellow-800 bg-yellow-500/10',
      error: 'border-danger text-danger bg-danger/10',
    };
    return `${base} ${types[type]}`;
  }
}

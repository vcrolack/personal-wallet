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
    const base = 'bg-white ';
    const types = {
      info: 'border-blue-500 text-blue-800 bg-blue-50',
      success: 'border-green-500 text-green-800 bg-green-50',
      warning: 'border-yellow-500 text-yellow-800 bg-yellow-50',
      error: 'border-red-500 text-red-800 bg-red-50',
    };
    return `${base} ${types[type]}`;
  }
}

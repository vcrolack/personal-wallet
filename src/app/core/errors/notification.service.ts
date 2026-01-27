import { inject, Injectable } from '@angular/core';
import { ToastService } from '../../common/components/ui/toast/toast.service';
import { NotificationType } from '../../common/components/ui/toast/toast.interface';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private readonly toastService = inject(ToastService);

  showNotification(message: string, type: NotificationType): void {
    console.log('[NotificationService] showNotification', message, type);
    this.toastService.show(message, type);
  }
}

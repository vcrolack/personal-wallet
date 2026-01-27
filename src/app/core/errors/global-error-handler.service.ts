import { ErrorHandler, inject, Injectable } from '@angular/core';
import { NotificationService } from './notification.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  private readonly notificationService = inject(NotificationService);

  handleError(error: any): void {
    console.log('[GlobalErrorHandler] Error: ', error);
    this.notificationService.showNotification(error.message, 'error');
  }
}

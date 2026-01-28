import { ErrorHandler, inject, Injectable } from '@angular/core';
import { NotificationService } from './notification.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  private readonly notificationService = inject(NotificationService);

  handleError(error: any): void {
    console.log('[GlobalErrorHandler] Error: ', error);

    let message = 'Ha ocurrido un error. Lo sentimos';

    if (typeof error === 'string') {
      message = error;
    } else if (error && error.message) {
      message = error.message;
    } else if (error && typeof error === 'object' && error.error) {
      // Fallback for some Angular unhandled errors
      message = error.error.message || message;
    }

    this.notificationService.showNotification(message, 'error');
  }
}

import { Injectable, signal } from '@angular/core';
import { NotificationType, Toast } from './toast.interface';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private _toastsSignal = signal<Toast[]>([]);

  public readonly toasts = this._toastsSignal.asReadonly();

  public show(
    message: string,
    type: NotificationType = 'info',
    duration = 3000,
  ) {
    const id = Date.now();
    const newToast: Toast = { id, message, type };

    this._toastsSignal.update((all) => [...all, newToast]);

    setTimeout(() => {
      this.remove(id);
    }, duration);
  }

  public remove(id: number) {
    this._toastsSignal.update((all) => all.filter((t) => t.id !== id));
  }
}

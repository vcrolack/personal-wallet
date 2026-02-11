import { Component, computed, input, output } from '@angular/core';

export type ModalSize = 'small' | 'medium' | 'large' | 'full';

@Component({
  selector: 'app-modal',
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
})
export class ModalComponent {
  public isOpen = input.required<boolean>();
  public title = input.required<string>();
  public size = input<ModalSize>('medium');

  public onClose = output<void>();

  public containerClasses = computed(() => {
    const baseClasses =
      'relative mx-auto my-6 w-full rounded-lg border-0 bg-surface-raised shadow-xl outline-none focus:outline-none';

    const sizeClasses: Record<ModalSize, string> = {
      small: 'max-w-md',
      medium: 'max-w-lg',
      large: 'max-w-4xl',
      full: 'max-w-full m-4',
    };

    return `${baseClasses} ${sizeClasses[this.size()]}`;
  });

  public close() {
    this.onClose.emit();
  }
}

import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-modal',
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
})
export class ModalComponent {
  public isOpen = input.required<boolean>();
  public title = input.required<string>();

  public onClose = output<void>();

  public close() {
    this.onClose.emit();
  }
}

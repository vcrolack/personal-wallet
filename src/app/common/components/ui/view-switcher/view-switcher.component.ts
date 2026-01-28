import { Component, input, output } from '@angular/core';
import { LucideAngularModule, LayoutGrid, List } from 'lucide-angular';
import { CommonModule } from '@angular/common';

export type ViewMode = 'grid' | 'list';

@Component({
  selector: 'app-view-switcher',
  standalone: true,
  imports: [LucideAngularModule, CommonModule],
  templateUrl: './view-switcher.component.html',
  styleUrl: './view-switcher.component.css',
})
export class ViewSwitcherComponent {
  public mode = input.required<ViewMode>();
  public onModeChange = output<ViewMode>();

  public icons = {
    grid: LayoutGrid,
    list: List,
  };

  public setMode(newMode: ViewMode) {
    if (this.mode() !== newMode) {
      this.onModeChange.emit(newMode);
    }
  }
}

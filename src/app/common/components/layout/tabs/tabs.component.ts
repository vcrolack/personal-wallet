import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  model,
  output,
} from '@angular/core';
import { TabItem } from '../../../interfaces/tab-item.interface';

@Component({
  selector: 'app-tabs',
  imports: [],
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabsComponent {
  public items = input.required<TabItem[]>();
  public activeTabId = model<string | number>();
  public onTabChange = output<TabItem>();
  public isValidTab = computed(() =>
    this.items().some((item) => item.id === this.activeTabId())
  );

  public selectTab(item: TabItem) {
    if (!item || item.id === this.activeTabId()) return;

    if (item.id === undefined || item.id === null) {
      console.warn('⚠️ [TabsComponent]: ID de tab no válido');
      return;
    }

    this.activeTabId.set(item.id);
    this.onTabChange.emit(item);
  }
}

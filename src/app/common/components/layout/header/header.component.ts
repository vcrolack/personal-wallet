import { Component, input } from '@angular/core';
import { TitleComponent } from '../../ui/typography/title/title.component';

@Component({
  selector: 'app-header',
  imports: [TitleComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  public title = input.required<string>();
}

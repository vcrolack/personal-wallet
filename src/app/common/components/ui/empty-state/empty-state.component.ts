import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Search } from 'lucide-angular';

@Component({
  selector: 'app-empty-state',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './empty-state.component.html',
  styleUrl: './empty-state.component.css',
})
export class EmptyStateComponent {
  public title = input<string>('No se encontraron resultados');
  public description = input<string>(
    'Intenta ajustar tus criterios de búsqueda o agregar un nuevo elemento.',
  );
  public icon = input<any>(Search);
}

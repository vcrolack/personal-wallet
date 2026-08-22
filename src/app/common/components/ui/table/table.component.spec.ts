import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GenericTableComponent } from './table.component';
import { ColumnDef } from './table.interface';

interface TestItem {
  id: number;
  name: string;
  amount: number;
}

describe('GenericTableComponent', () => {
  let component: GenericTableComponent<TestItem>;
  let fixture: ComponentFixture<GenericTableComponent<TestItem>>;

  const mockData: TestItem[] = [
    { id: 1, name: 'Banana', amount: 50 },
    { id: 2, name: 'Manzana', amount: 20 },
    { id: 3, name: 'Naranja', amount: 100 },
  ];

  const mockColumns: ColumnDef<TestItem>[] = [
    { key: 'name', header: 'Nombre', sortable: true },
    { key: 'amount', header: 'Monto', sortable: true },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenericTableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GenericTableComponent<TestItem>);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('data', mockData);
    fixture.componentRef.setInput('columns', mockColumns);
    fixture.detectChanges();
  });

  it('debe crearse correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('debe ordenar los datos client-side en dirección ascendente y descendente', () => {
    // Inicialmente en el orden original
    expect(component.processedData()).toEqual(mockData);

    // Activar ordenamiento por 'name' ascendente
    component.toggleSort(mockColumns[0]);
    fixture.detectChanges();

    expect(component.sort()).toEqual({ active: 'name', direction: 'asc' });
    expect(component.processedData().map((d) => d.name)).toEqual([
      'Banana',
      'Manzana',
      'Naranja',
    ]);

    // Cambiar a descendente
    component.toggleSort(mockColumns[0]);
    fixture.detectChanges();

    expect(component.sort()).toEqual({ active: 'name', direction: 'desc' });
    expect(component.processedData().map((d) => d.name)).toEqual([
      'Naranja',
      'Manzana',
      'Banana',
    ]);
  });

  it('debe filtrar los datos client-side con la señal searchValue', () => {
    component.onSearchInput('manz');
    fixture.detectChanges();

    expect(component.processedData().length).toBe(1);
    expect(component.processedData()[0].name).toBe('Manzana');
  });

  it('debe emitir eventos sortChange y searchChange', () => {
    let emittedSort: any = null;
    let emittedSearch: any = null;

    component.sort.subscribe((val) => (emittedSort = val));
    component.searchChange.subscribe((val) => (emittedSearch = val));

    component.toggleSort(mockColumns[1]);
    expect(emittedSort).toEqual({ active: 'amount', direction: 'asc' });

    component.onSearchInput('test');
    expect(emittedSearch).toBe('test');
  });
});

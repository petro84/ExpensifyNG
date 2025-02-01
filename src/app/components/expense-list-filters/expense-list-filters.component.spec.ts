import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseListFiltersComponent } from './expense-list-filters.component';

describe('ExpenseListFiltersComponent', () => {
  let component: ExpenseListFiltersComponent;
  let fixture: ComponentFixture<ExpenseListFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpenseListFiltersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpenseListFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

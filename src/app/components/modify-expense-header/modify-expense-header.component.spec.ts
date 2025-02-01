import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyExpenseHeaderComponent } from './modify-expense-header.component';

describe('ModifyExpenseHeaderComponent', () => {
  let component: ModifyExpenseHeaderComponent;
  let fixture: ComponentFixture<ModifyExpenseHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifyExpenseHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifyExpenseHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

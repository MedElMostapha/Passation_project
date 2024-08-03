import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputBudgetaireComponent } from './input-budgetaire.component';

describe('InputBudgetaireComponent', () => {
  let component: InputBudgetaireComponent;
  let fixture: ComponentFixture<InputBudgetaireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputBudgetaireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputBudgetaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

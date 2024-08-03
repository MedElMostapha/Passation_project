import { TestBed } from '@angular/core/testing';

import { InputBudgetaireService } from './input-budgetaire.service';

describe('InputBudgetaireService', () => {
  let service: InputBudgetaireService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InputBudgetaireService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

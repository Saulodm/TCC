import { TestBed } from '@angular/core/testing';

import { DependenteService } from './dependente.service';

describe('DependenteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DependenteService = TestBed.get(DependenteService);
    expect(service).toBeTruthy();
  });
});

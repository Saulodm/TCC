import { TestBed } from '@angular/core/testing';

import { VacinaService } from './vacina.service';

describe('VacinaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VacinaService = TestBed.get(VacinaService);
    expect(service).toBeTruthy();
  });
});

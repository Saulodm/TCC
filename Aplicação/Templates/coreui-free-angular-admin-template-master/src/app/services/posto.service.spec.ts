import { TestBed } from '@angular/core/testing';

import { PostoService } from './posto.service';

describe('PostoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PostoService = TestBed.get(PostoService);
    expect(service).toBeTruthy();
  });
});

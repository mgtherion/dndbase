import { TestBed, inject } from '@angular/core/testing';

import { EnchantmentsService } from './enchantments.service';

describe('EnchantmentsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EnchantmentsService]
    });
  });

  it('should be created', inject([EnchantmentsService], (service: EnchantmentsService) => {
    expect(service).toBeTruthy();
  }));
});

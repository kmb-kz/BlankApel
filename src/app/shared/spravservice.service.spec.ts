/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SpravserviceService } from './spravservice.service';

describe('SpravserviceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SpravserviceService]
    });
  });

  it('should ...', inject([SpravserviceService], (service: SpravserviceService) => {
    expect(service).toBeTruthy();
  }));
});

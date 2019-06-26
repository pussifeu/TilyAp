import { TestBed } from '@angular/core/testing';

import { ServicesSongsService } from './services-songs.service';

describe('ServicesSongsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServicesSongsService = TestBed.get(ServicesSongsService);
    expect(service).toBeTruthy();
  });
});

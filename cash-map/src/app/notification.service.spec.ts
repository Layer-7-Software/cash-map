import { TestBed } from '@angular/core/testing';
import { MaterialModule } from './material.module';

import { NotificationService } from './notification.service';

describe('NotificationService', () => {
  let service: NotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule
      ],
      declarations: [],
      providers: []
    });
    service = TestBed.inject(NotificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClearCacheDialogComponent } from './clear-cache-dialog.component';

describe('ClearCacheDialogComponent', () => {
  let component: ClearCacheDialogComponent;
  let fixture: ComponentFixture<ClearCacheDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClearCacheDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClearCacheDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CacheService } from '../cache.service';
import { ClearCacheDialogComponent } from '../clear-cache-dialog/clear-cache-dialog.component';
import { Budget } from '../models/Budget';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'app-cache-controls',
  templateUrl: './cache-controls.component.html',
  styleUrls: ['./cache-controls.component.scss']
})
export class CacheControlsComponent implements OnInit {

  @Input() budget: Budget;
  @Output() budgetChange: EventEmitter<Budget>;

  constructor(
    private cacheService: CacheService,
    private notificationService: NotificationService,
    private dialog: MatDialog
  ) {
    this.budget = new Budget();
    this.budgetChange = new EventEmitter<Budget>();
  }

  ngOnInit(): void {
  }

  save(): void {
    this.cacheService.save(this.budget);
    this.notificationService.message('Saved.');
  }

  load(): void {
    this.budgetChange.emit(this.cacheService.load());
    this.notificationService.message('Loaded.');
  }

  clear(): void {
    const confirmationDialog = this.dialog.open(ClearCacheDialogComponent);
    confirmationDialog.afterClosed().subscribe(result => {
      if (result === true) {
        this.budget = new Budget();
        this.cacheService.clear();
        this.notificationService.message('Cleared save data.');
      }
    });
  }

  download(): void {
    this.cacheService.download();
  }

}

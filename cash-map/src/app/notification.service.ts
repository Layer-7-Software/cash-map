import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private snackbar: MatSnackBar) { }

  message(message: string): void {
    this.snackbar.open(message, 'OK', {
      duration: 3 * 1000
    });
  }
}

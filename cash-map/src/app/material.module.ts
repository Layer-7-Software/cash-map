import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  imports: [],
  exports: [
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatSnackBarModule,
  ]
})
export class MaterialModule { }

import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  private readonly sb = inject(MatSnackBar);

  showMessage(message: string) {
    this.sb.open(message, 'X', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }
}

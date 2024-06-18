import { Component, Inject, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';
import { timeout, delay } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-action-notification',
  templateUrl: './action-notification.component.html',
  styleUrls: ['./action-notification.component.css']
})
export class ActionNotificationComponent {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) { }

  ngOnInit() {
    if (!this.data.showUndoButton || (this.data.undoButtonDuration >= this.data.duration)) {
      return;
    }

    this.delayForUndoButton(this.data.undoButtonDuration).subscribe(() => {
      this.data.showUndoButton = false;
    });
  }

  delayForUndoButton(timeToDelay: any) {
    return of('').pipe(delay(timeToDelay));
  }

  public onDismissWithAction() { this.data.snackBar.dismiss(); }

  public onDismiss() { this.data.snackBar.dismiss(); }
}

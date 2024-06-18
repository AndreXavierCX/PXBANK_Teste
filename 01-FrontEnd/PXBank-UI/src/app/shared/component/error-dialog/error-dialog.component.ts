import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
	selector: 'm-error-dialog',
	templateUrl: './error-dialog.component.html'
})
export class ErrorDialogComponent implements OnInit {
	viewLoading: boolean = false;

	constructor(
		public dialogRef: MatDialogRef<ErrorDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,
	) { }

	ngOnInit() {
		if (this.data.title === '') {
			this.data.title = "Erro";
		}
	}

	onYesClick(): void {
		this.dialogRef.close(true);
	}
}

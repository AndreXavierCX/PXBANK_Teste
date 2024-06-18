import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
	selector: 'm-delete-entity-dialog',
	templateUrl: './delete-entity-dialog.component.html'
})
export class DeleteEntityDialogComponent implements OnInit {
	viewLoading: boolean = false;

	constructor(
		public dialogRef: MatDialogRef<DeleteEntityDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any
	) { }

	ngOnInit() {
	}

	onNoClick(): void {
		this.dialogRef.close();
	}

	onYesClick(): void {
			this.dialogRef.close(true);
	}
}

import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActionNotificationComponent } from 'src/app/shared/component/action-notification/action-notification.component';
import { DeleteEntityDialogComponent } from 'src/app/shared/component/delete-entity-dialog/delete-entity-dialog.component';
import { ErrorDialogComponent } from 'src/app/shared/component/error-dialog/error-dialog.component';

export enum MessageType {
	Create,
	Read,
	Update,
	Delete
}

@Injectable()
export class LayoutUtilsService {
	constructor(private snackBar: MatSnackBar,
		private dialog: MatDialog) { }

	// SnackBar for notifications
	showActionNotification(
		message: string,
		type: MessageType = MessageType.Create,
		duration: number = 5000,
		showCloseButton: boolean = true,
		showUndoButton: boolean = false,
		undoButtonDuration: number = 3000,
		verticalPosition: 'top' | 'bottom' = 'top'
	) {
		return this.snackBar.openFromComponent(ActionNotificationComponent, {
			duration: duration,
			data: {
				message,
				snackBar: this.snackBar,
				showCloseButton: showCloseButton,
				showUndoButton: showUndoButton,
				undoButtonDuration,
				verticalPosition,
				type,
				action: 'Undo'
			},
			verticalPosition: verticalPosition
		});
	}

	ShowError(title: string = '', description: string = '', errDetail: string = '') {
		return this.dialog.open(ErrorDialogComponent, {
			data: { title, description, errDetail },
			width: '640px'
		});
	}

	// ShowLog(title: string = '', id: number = 0, tabela: string = '') {
	// 	return this.dialog.open(LogDialogComponent, {
	// 		data: { title, id, tabela },
	// 		width: '1000px'
	// 	});
	// }

	showConfirm(title: string = '', description: string = '') {
		return this.dialog.open(ErrorDialogComponent, {
			data: { title, description },
			width: '440px'
		});
	}

	deleteElement(title: string = '', description: string = '', waitDesciption: string = '') {
		return this.dialog.open(DeleteEntityDialogComponent, {
			data: { title, description, waitDesciption },
			width: '440px'
		});
	}

	// Method returns instance of MatDialog
	// fetchElements(_data) {
	// 	return this.dialog.open(FetchEntityDialogComponent, {
	// 		data: _data,
	// 		width: '400px'
	// 	});
	// }

	// // Method returns instance of MatDialog
	// updateStatusForCustomers(title, statuses, messages) {
	// 	return this.dialog.open(UpdateStatusDialogComponent, {
	// 		data: { title, statuses, messages },
	// 		width: '480px'
	// 	});
	// }

	// // Method returns instance of MatDialog
	// updateStatusFor(title, statuses, messages) {
	// 	return this.dialog.open(UpdateStatusDialogComponent, {
	// 		data: { title, statuses, messages },
	// 		width: '480px'
	// 	});
	// }
}

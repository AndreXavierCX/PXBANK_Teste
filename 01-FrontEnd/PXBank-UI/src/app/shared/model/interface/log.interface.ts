export interface ILog {
	userId: number; // user who did changes
	createdDate: Date; // date when entity were created => format: 'mm/dd/yyyy'
	updatedDate: Date; // date when changed were applied => format: 'mm/dd/yyyy'
}

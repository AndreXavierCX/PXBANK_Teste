export class QueryResultsModel {
	// fields
	items: any[];
	totalCount: number;
	errorMessage: string = "";
	obj: any;

	constructor(_items: any[] = [], _errorMessage: string = '', _obj: any = {}) {
		this.items = _items;
		this.totalCount = _items.length;
		this.obj = _obj;
	}
}

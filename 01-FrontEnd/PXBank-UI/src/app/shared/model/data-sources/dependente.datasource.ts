import { Observable, of } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';
import { BaseDataSource } from './_base.datasource';
import { QueryParamsModel } from '../query-models/query-params.model';
import { PessoaService } from 'src/app/core/service/pessoa.service';
import { QueryResultsModel } from '../query-models/query-results.model';
import { DependenteService } from 'src/app/core/service/dependente.service';

export class DependenteDataSource extends BaseDataSource {
	constructor(private service: DependenteService) {
		super();
	}

	loadItems(
		queryParams: QueryParamsModel,
		departamentoID: number = 0
	) {
		this.loadingSubject.next(true);
		this.service.GetByPage(queryParams, departamentoID).pipe(
			tap(res => {
				this.entitySubject.next(res.items);
				this.paginatorTotalSubject.next(res.totalCount);
			}),
			catchError(err => of(new QueryResultsModel([], err))),
			finalize(() => this.loadingSubject.next(false))
		).subscribe();
	}
}

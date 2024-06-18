import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, forkJoin, BehaviorSubject, of, throwError } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';

// import { SignalrService, SignalrServiceLocks } from '../../_core/signalrclient/signalr.service';
import { HttpUtilsService } from '../utils/http-utils.service';

import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { LayoutUtilsService } from '../utils/layout-utils.service';

const API_USUARIOS_URL = 'api/usuarios';

// @Injectable()
export class BaseService {

	constructor(
		private httpUtilsBase: HttpUtilsService,
		private httpBase: HttpClient,
		private router: Router) { }

	handleError(error: HttpErrorResponse, layoutUtilsService: LayoutUtilsService) {
		if (error.error instanceof ErrorEvent) {
		  // A client-side or network error occurred. Handle it accordingly.
		  const dialogRef = layoutUtilsService.ShowError("Erro",
		   `Ocorreu um erro interno no servidor`, error.error.message);
		} else {
		  // nao implementado por nao ter autenticação
			if (error.status === 401) {
			}
			else if (error.status === 403) {
			}
			else {
				const dialogRef = layoutUtilsService.ShowError("Erro",
          `Ocorreu um erro interno no servidor`, error.error.message);

				dialogRef.afterClosed().subscribe();
			}
		}
		throw new Error('Ocorreu um erro inesperado...');
	}

}

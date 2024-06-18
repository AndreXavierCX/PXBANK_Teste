import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { QueryParamsModel } from 'src/app/shared/model/query-models/query-params.model';
import { QueryResultsModel } from 'src/app/shared/model/query-models/query-results.model';
import { HttpUtilsService } from '../utils/http-utils.service';
import { BaseService } from './_base.service';
import { Router } from '@angular/router';
import { LayoutUtilsService } from '../utils/layout-utils.service';
import { PessoaModel } from 'src/app/shared/model/pessoa.model';
import { DepartamentoModel } from 'src/app/shared/model/departamento.model';

const API_URL = 'https://localhost:44317/api/departamento';

@Injectable({
  providedIn: 'root'
})
export class DepartamentoService extends BaseService{

  constructor(
    private lUService: LayoutUtilsService,
    private http: HttpClient,
    private httpUtils: HttpUtilsService,
    private router1: Router
  ) {
    super(httpUtils, http, router1);
  }

  GetAll(): Observable<DepartamentoModel[]> {
    const apiURL = `${API_URL}`;
    return this.http.get<DepartamentoModel[]>(apiURL).pipe(catchError((error, caught) => {
      this.handleError(error, this.lUService);
      return of(error);
    }) as any);;
  }

  
}

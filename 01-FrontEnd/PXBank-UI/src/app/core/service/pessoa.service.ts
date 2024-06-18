import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { QueryParamsModel } from 'src/app/shared/model/query-models/query-params.model';
import { QueryResultsModel } from 'src/app/shared/model/query-models/query-results.model';
import { HttpUtilsService } from '../utils/http-utils.service';
import { BaseService } from './_base.service';
import { Router } from '@angular/router';
import { LayoutUtilsService } from '../utils/layout-utils.service';
import { PessoaModel } from 'src/app/shared/model/pessoa.model';

const API_URL = 'https://localhost:44317/api/pessoa';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class PessoaService extends BaseService {

  constructor(
    private lUService: LayoutUtilsService,
    private http: HttpClient,
    private httpUtils: HttpUtilsService,
    private router1: Router
  ) {
    super(httpUtils, http, router1);
  }

  GetByID(id: number): Observable<PessoaModel> {
    const apiURL = `${API_URL}/${id}`;
    return this.http.get<PessoaModel>(apiURL).pipe(catchError((error, caught) => {
      this.handleError(error, this.lUService);
      return of(error);
    }) as any);;
  }

  Delete(id: number) {
    const apiURL = `${API_URL}/${id}`;
    return this.http.delete<string>(apiURL).pipe(catchError((error, caught) => {
      this.handleError(error, this.lUService);
      return of(error);
    }) as any);;
  }

  Post(dados: PessoaModel): Observable<any> {
    const apiURL = `${API_URL}`;
    return this.http.post<any>(apiURL, dados, httpOptions).pipe(catchError((error, caught) => {
      this.handleError(error, this.lUService);
      return of(error);
    }) as any);;
  }

  Put(dados: PessoaModel) : Observable<any> {
    const apiUrl = `${API_URL}`;
    return this.http.put<PessoaModel>(apiUrl, dados).pipe(catchError((error, caught) => {
      this.handleError(error, this.lUService);
      return of(error);
    }) as any);;
  }

  GetByPage(queryParams: QueryParamsModel, departamentoID: number = 0): Observable<QueryResultsModel> {
    // Note: Add headers if needed (tokens/bearer)
    const url = API_URL + `/GetByPage/${departamentoID}/`;
    const httpParams = this.httpUtils.getFindHTTPParams(queryParams);

    return this.http.get<QueryResultsModel>(url, {params: httpParams,}).pipe(catchError((error, caught) => {
      this.handleError(error, this.lUService);
      return of(error);
    }) as any);
  }
}

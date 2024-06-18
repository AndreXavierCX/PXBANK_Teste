import { Component, OnInit, OnDestroy, ElementRef, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef, ViewRef, Input } from '@angular/core';
// Material
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
// RXJS
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { fromEvent, merge, forkJoin } from 'rxjs';

import { QueryParamsModel } from 'src/app/shared/model/query-models/query-params.model';
import { DepartamentoService } from 'src/app/core/service/departamento.service';
import { DepartamentoModel } from 'src/app/shared/model/departamento.model';
import { LayoutUtilsService, MessageType } from 'src/app/core/utils/layout-utils.service';
import { appUtils } from 'src/app/core/utils/app-utils';
import { DependenteService } from 'src/app/core/service/dependente.service';
import { DependenteDataSource } from 'src/app/shared/model/data-sources/dependente.datasource';
import { DependenteModel } from 'src/app/shared/model/dependente.model';
import { EditarDependenteComponent } from '../editar-dependente/editar-dependente.component';

@Component({
  selector: 'app-listar-dependente',
  templateUrl: './listar-dependente.component.html',
  styleUrls: ['./listar-dependente.component.css']
})
export class ListarDependenteComponent {
  @Input() pessoaID!: number;
  dataSource!: DependenteDataSource;
  displayedColumns: string[] = ['nome', 'CPF', 'Idade', "acoes"];
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  // Selection
  selection = new SelectionModel<any>(true, []);
  result: QueryParamsModel[] = [];
  one$: any;
  newDefaultLoaded: boolean = false;

  departamentos: DepartamentoModel[] = [];

  constructor(
    private service: DependenteService,
    private serviceDepartamento: DepartamentoService,
    private layoutUtilsService: LayoutUtilsService,
    private dialog: MatDialog,
    private appUtils: appUtils
  ) { }

  get fu() {
    return this.appUtils;
  }

  ngAfterContentInit(): void {

  }

  ngOnInit(): void {

    // this.one$ = this.subheaderService.ExcelClick.subscribe((conn) => this.subMenuClick(conn));
    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    this.paginator._intl.itemsPerPageLabel = "Itens por página";
    this.paginator._intl.nextPageLabel = "Próximo";
    this.paginator._intl.previousPageLabel = "Anterior";
    this.paginator._intl.firstPageLabel = "Primeira";
    this.paginator._intl.lastPageLabel = "Ultima";

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap(() => {
          this.loadList();
        })
      )
      .subscribe();



    const queryParams = new QueryParamsModel(this.filterConfiguration(false));
    this.dataSource = new DependenteDataSource(this.service);

    this.dataSource.loadItems(queryParams, this.pessoaID);
    this.dataSource.entitySubject.subscribe(res => (this.result = res
    ));

    this.ObterDepartamentos();
  }

  ObterDepartamentos() {
    this.serviceDepartamento.GetAll().subscribe(res => {
      this.departamentos = res;
    });
  }

  loadList() {
    this.selection.clear();
    const queryParams = new QueryParamsModel(
      this.filterConfiguration(true),
      this.sort.direction,
      this.sort.active,
      this.paginator.pageIndex,
      this.paginator.pageSize
    );
    this.dataSource.loadItems(queryParams, this.pessoaID);
    this.selection.clear();
  }

  statusSelectionChange() {
    this.paginator.pageIndex = 0;
    this.loadList();
  }

  filterConfiguration(isGeneralSearch: boolean = true): any {
    const filter: any = {};
    const searchText: string = "";
    filter.status = +false;
    filter.search = searchText;
    return filter;
  }

  addItem(isNovo: boolean = true) {
    const newItem: DependenteModel = new DependenteModel();
    this.editItem(newItem, false);
  }

  editItem(item: DependenteModel, isDetail: boolean) {

    let saveMessageTranslateParam = 'Dados Salvos com Sucesso';
    saveMessageTranslateParam += item.DependenteID > 0 ? 'Atualizar' : 'Novo';
    const _saveMessage = saveMessageTranslateParam;
    const _messageType = item.DependenteID > 0 ? MessageType.Update : MessageType.Create;

    let pessoaID = this.pessoaID;
    console.log(pessoaID);
    const dialogRef = this.dialog.open(EditarDependenteComponent, { maxHeight: '90vh', disableClose: true, data: { item, isDetail, pessoaID } });
    dialogRef.afterClosed().subscribe(res => {
      if (!res) {
        return;
      }
      this.layoutUtilsService.showActionNotification(_saveMessage, _messageType, 10000, true, false);
      this.loadList();
    });
  }


  deleteItem(_item: DependenteModel) {
    const _title: string = 'Excluir';
    const _description: string = `Voce tem certeza que deseja excluir o dependente ${_item.Nome} - ${_item.CPF}?`;
    const _waitDesciption: string = 'Aguardando';
    const _deleteMessage = 'Dados Excluidos';

    const dialogRef = this.layoutUtilsService.deleteElement(_title, _description, _waitDesciption);
    dialogRef.afterClosed().subscribe(res => {
      if (!res) {
        return;
      }

      this.service.Delete(_item.DependenteID).subscribe(() => {
        this.layoutUtilsService.showActionNotification(_deleteMessage, MessageType.Delete);
        this.loadList();
      });
    });
  }
}

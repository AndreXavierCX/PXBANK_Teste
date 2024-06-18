import { Component, OnInit, OnDestroy, ElementRef, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef, ViewRef } from '@angular/core';
// Material
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
// RXJS
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { fromEvent, merge, forkJoin } from 'rxjs';

import { PessoaDataSource } from 'src/app/shared/model/data-sources/pessoa.datasource';
import { PessoaModel } from 'src/app/shared/model/pessoa.model';
import { PessoaService } from 'src/app/core/service/pessoa.service';
import { QueryParamsModel } from 'src/app/shared/model/query-models/query-params.model';
import { DepartamentoService } from 'src/app/core/service/departamento.service';
import { DepartamentoModel } from 'src/app/shared/model/departamento.model';
import { EditarPessoaComponent } from '../editar-pessoa/editar-pessoa.component';
import { LayoutUtilsService, MessageType } from 'src/app/core/utils/layout-utils.service';
import { appUtils } from 'src/app/core/utils/app-utils';

@Component({
  selector: 'app-listar-pessoa',
  templateUrl: './listar-pessoa.component.html',
  styleUrls: ['./listar-pessoa.component.css']
})
export class ListarPessoaComponent {
  dataSource!: PessoaDataSource;
  displayedColumns: string[] = ['nome', 'departamento', 'salario', 'dataNascimento', "numfilhos", "acoes"];
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  // Filter fields
  @ViewChild('searchInput', { static: true }) searchInput!: ElementRef;
  filterStatus: string = '-1';
  filterType: string = '';
  // Selection
  selection = new SelectionModel<any>(true, []);
  result: QueryParamsModel[] = [];
  one$: any;
  newDefaultLoaded: boolean = false;

  departamentoID = 0;
  departamentos: DepartamentoModel[] = [];

  constructor(
    private service: PessoaService,
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

    fromEvent(this.searchInput.nativeElement, 'keyup')
      .pipe(
        // tslint:disable-next-line:max-line-length
        debounceTime(250), // The user can type quite quickly in the input box, and that could trigger a lot of server requests. With this operator, we are limiting the amount of server requests emitted to a maximum of one every 150ms
        distinctUntilChanged(), // This operator will eliminate duplicate values
        tap(() => {
          this.paginator.pageIndex = 0;
          this.loadList();
        })
      )
      .subscribe();

    const queryParams = new QueryParamsModel(this.filterConfiguration(false));
    this.dataSource = new PessoaDataSource(this.service);

    this.dataSource.loadItems(queryParams, this.departamentoID);
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
    this.dataSource.loadItems(queryParams, this.departamentoID);
    this.selection.clear();
  }

  statusSelectionChange() {
    this.paginator.pageIndex = 0;
    this.loadList();
  }

  filterConfiguration(isGeneralSearch: boolean = true): any {
    const filter: any = {};
    const searchText: string = this.searchInput.nativeElement.value;

    if (this.filterStatus && this.filterStatus.length > 0) {
      filter.status = +this.filterStatus;
    } else {
      filter.status = +false;
    }

    filter.search = searchText;
    return filter;
  }

  addItem(isNovo: boolean = true) {
    const newItem: PessoaModel = new PessoaModel();
    this.editItem(newItem, false);
  }

  editItem(item: PessoaModel, isDetail: boolean) {

    let saveMessageTranslateParam = 'Dados Salvos com Sucesso';
    saveMessageTranslateParam += item.PessoaID > 0 ? 'Atualizar' : 'Novo';
    const _saveMessage = saveMessageTranslateParam;
    const _messageType = item.PessoaID > 0 ? MessageType.Update : MessageType.Create;
    const dialogRef = this.dialog.open(EditarPessoaComponent, { maxHeight: '90vh', disableClose: true, data: { item, isDetail } });
    dialogRef.afterClosed().subscribe(res => {
      if (!res) {
        return;
      }
      this.layoutUtilsService.showActionNotification(_saveMessage, _messageType, 10000, true, false);
      this.loadList();
    });
  }


  deleteItem(_item: PessoaModel) {
    const _title: string ='Excluir';
    const _description: string = `Confirmar Exclusão do Funcionario ${_item.Nome} - ${_item.Cpf}?`;
    const _waitDesciption: string = 'Aguardando';
    const _deleteMessage = 'Dados Excluidos';

    const dialogRef = this.layoutUtilsService.deleteElement(_title, _description, _waitDesciption);
    dialogRef.afterClosed().subscribe(res => {
      if (!res) {
        return;
      }

      this.service.Delete(_item.PessoaID).subscribe(() => {
        this.layoutUtilsService.showActionNotification(_deleteMessage, MessageType.Delete);
        this.loadList();
      });
    });
  }
}

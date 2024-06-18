import { Observable, forkJoin, of, observable } from 'rxjs';

import { Component, OnInit, OnDestroy, Inject, ChangeDetectionStrategy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PessoaModel } from 'src/app/shared/model/pessoa.model';
import { LayoutUtilsService } from 'src/app/core/utils/layout-utils.service';
import { PessoaService } from 'src/app/core/service/pessoa.service';
import { DepartamentoService } from 'src/app/core/service/departamento.service';
import { DepartamentoModel } from 'src/app/shared/model/departamento.model';
import { appUtils } from 'src/app/core/utils/app-utils';
import { CustomValidator } from 'src/app/core/validators/custom-validator';
import { NgxMaskService } from 'ngx-mask';

@Component({
  selector: 'app-editar-pessoa',
  templateUrl: './editar-pessoa.component.html',
  styleUrls: ['./editar-pessoa.component.css']
})
export class EditarPessoaComponent {
  item: PessoaModel = new PessoaModel();
  form!: FormGroup;
  hasFormErrors: boolean = false;
  viewLoading: boolean = false;
  loadingAfterSubmit: boolean = false;
  autonumeracoes!: Observable<Array<any>>;
  isDetails: boolean = false;
  isNewDefault: boolean = false;

  departamentos: DepartamentoModel[] = [];

  constructor(public dialogRef: MatDialogRef<EditarPessoaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private layoutUtilsService: LayoutUtilsService,
    private fb: FormBuilder,
    private service: PessoaService,
    private serviceDepartamento: DepartamentoService,
    private pipeMask: NgxMaskService,
    private appUtils: appUtils
  ) { }

  ngOnInit() {
    this.ObterDepartamentos();
    if (this.data.isNewDefault) {
      this.isNewDefault = this.data.isNewDefault;
      this.loadNewDefault(this.data.item.PessoaID);
    } else {
      this.loadEdit();
    }
  }

  ObterDepartamentos() {
    this.serviceDepartamento.GetAll().subscribe(res => {
      this.departamentos = res;
    });
  }

  ngOnDestroy() {

  }

  loadNewDefault(newDefault: PessoaModel) {

    this.viewLoading = true;
    this.item = this.data.item;

    this.createForm();
    this.viewLoading = false;
  }

  loadEdit() {
    if (this.data.item && this.data.item.id > 0) {
      this.viewLoading = true;

      this.item = this.data.item;
      this.createForm();

      this.service.GetByID(this.data.item.id).subscribe(res => {
        this.item = res;
        this.createForm(); // this.form.reset(this.item);
        this.viewLoading = false;
      }, err => {
        this.viewLoading = false;
      });
    } else {
      this.item = this.data.item;
      this.createForm();
      this.viewLoading = false;
    }
  }

  createForm() {
    console.log(this.item);
    this.form = this.fb.group({
      PessoaID: [this.item.PessoaID, [Validators.required]],
      Nome: [this.item.Nome, [Validators.required]],
      CPF: [this.item.Cpf, [Validators.required, CustomValidator.isCPFValido()]],
      DepartamentoID: [this.item.DepartamentoID, [Validators.required]],
      Salario: [this.item.Salario, [Validators.required]],
      DataNascimento: [this.appUtils.DateToFormControl(this.item.DataNascimento), [Validators.required]],
      NumFilhos: [this.item.NumFilhos, [Validators.required]],
      IsAtivo: [this.item.IsAtivo, [Validators.required]],
    });
    console.log(this.form.value);
  }

  /** UI */
  getTitle(): string {
    return "Funcionario";
    // if (this.isNewDefault) {
    // 	return `( ${this.translate.instant('GENERAL.COMMON.NEWDEFAULT')} )`;
    // }

    // if (this.item.id > 0) {
    // 	if (this.isDetails) {
    // 		return `${this.translate.instant('GENERAL.COMMON.DETAILMODE')}
    // 		'${
    // 			this.item.descricao
    // 		}'`;
    // 	} else {
    // 		return `${this.translate.instant('GENERAL.CLIENTESTIPOS.EDITCLIENTESTIPOS')}
    // 		'${
    // 			this.item.descricao
    // 		}'`;
    // 	}
    // }

    // return this.translate.instant('GENERAL.CLIENTESTIPOS.NEWCLIENTESTIPOS');
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.form.controls[controlName];
    const result = control.invalid && control.touched;
    return result;
  }

  /** ACTIONS */
  prepareItem(): PessoaModel {
    const controls = this.form.controls;

    this.item.PessoaID = controls['PessoaID'].value;
    this.item.Nome = controls['Nome'].value;
    this.item.Cpf = controls['CPF'].value;
    this.item.DepartamentoID = controls['DepartamentoID'].value;
    this.item.Salario = controls['Salario'].value;
    this.item.DataNascimento = controls['DataNascimento'].value;
    this.item.NumFilhos = controls['NumFilhos'].value;
    this.item.IsAtivo = controls['IsAtivo'].value;

    return this.item;
  }

  onSubmit() {
    this.hasFormErrors = false;
    this.loadingAfterSubmit = false;
    const controls = this.form.controls;
    const editedItem = this.prepareItem();

    console.log(editedItem);

    if (editedItem.PessoaID > 0) {
      this.updateItem(editedItem);
    } else {
      this.createItem(editedItem);
    }

  }

  updateItem(_clienteTipo: PessoaModel) {
    this.loadingAfterSubmit = true;
    this.viewLoading = true;
    this.service.Put(_clienteTipo).subscribe(res => {
      this.dialogRef.close({
        _clienteTipo,
        isEdit: true
      });
      this.viewLoading = false;
    }, err => {
      this.viewLoading = false;
    });
  }

  createItem(_clienteTipo: PessoaModel) {
    this.loadingAfterSubmit = true;
    this.viewLoading = true;
    this.service.Post(_clienteTipo).subscribe(res => {
      this.viewLoading = false;
      this.dialogRef.close({
        _clienteTipo,
        isEdit: false
      });
      this.viewLoading = false;
    }, err => {
      this.viewLoading = false;
    });
  }

  saveNewDefault() {
    const editedItem = this.prepareItem();
    this.loadingAfterSubmit = true;
    this.viewLoading = true;


  }

  hasChanges(forceChange: boolean = false) {
    if (forceChange) {
      this.form.markAsPristine();
      this.form.markAsUntouched();
      return false;
    } else {
      return this.form.dirty;
    }
  }

  onClose() {
    if (!this.isDetails && this.hasChanges(false)) {
      const _title: string = "Cancelar";
      const _description: string = "Voce tem certeza que deseja cancelar?";
      const dialogRef = this.layoutUtilsService.showConfirm(_title, _description);
      dialogRef.afterClosed().subscribe(res => {
        if (!res) {
          return;
        }
        this.dialogRef.close();
      });
    } else {
      this.dialogRef.close();
    }
  }

  onAlertClose($event: any) {
    this.hasFormErrors = false;
  }
}

import { Observable, forkJoin, of, observable } from 'rxjs';

import { Component, OnInit, OnDestroy, Inject, ChangeDetectionStrategy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LayoutUtilsService } from 'src/app/core/utils/layout-utils.service';
import { DepartamentoService } from 'src/app/core/service/departamento.service';
import { DepartamentoModel } from 'src/app/shared/model/departamento.model';
import { appUtils } from 'src/app/core/utils/app-utils';
import { CustomValidator } from 'src/app/core/validators/custom-validator';
import { NgxMaskService } from 'ngx-mask';
import { DependenteModel } from 'src/app/shared/model/dependente.model';
import { DependenteService } from 'src/app/core/service/dependente.service';

@Component({
  selector: 'app-editar-dependente',
  templateUrl: './editar-dependente.component.html',
  styleUrls: ['./editar-dependente.component.css']
})
export class EditarDependenteComponent {
  item: DependenteModel = new DependenteModel();
  form!: FormGroup;
  hasFormErrors: boolean = false;
  viewLoading: boolean = false;
  loadingAfterSubmit: boolean = false;
  autonumeracoes!: Observable<Array<any>>;
  isDetails: boolean = false;
  isNewDefault: boolean = false;
  pessoaID!: number;

  departamentos: DepartamentoModel[] = [];

  constructor(public dialogRef: MatDialogRef<EditarDependenteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private layoutUtilsService: LayoutUtilsService,
    private fb: FormBuilder,
    private service: DependenteService,
    private serviceDepartamento: DepartamentoService,
    private pipeMask: NgxMaskService,
    private appUtils: appUtils
  ) { }

  ngOnInit() {
    this.ObterDepartamentos();

    this.pessoaID = this.data.pessoaID;
    console.log(this.data);
    if (this.data.isNewDefault) {
      this.isNewDefault = this.data.isNewDefault;
      this.loadNewDefault(this.data.item.DependenteID);
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

  loadNewDefault(newDefault: DependenteModel) {

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
    console.log(this.pessoaID);
    this.form = this.fb.group({
      DependenteID: [this.item.DependenteID, [Validators.required]],
      PessoaID: [this.pessoaID, [Validators.required]],
      Nome: [this.item.Nome, [Validators.required]],
      CPF: [this.item.CPF, [Validators.required]],
      DataNascimento: [this.item.DataNascimento, [Validators.required]],
    });
    console.log(this.form.value);
  }

  /** UI */
  getTitle(): string {
    return "Dependente";
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
  prepareItem(): DependenteModel {
    const controls = this.form.controls;

    this.item.DependenteID = controls['DependenteID'].value;
    this.item.PessoaID = controls['PessoaID'].value;
    this.item.Nome = controls['Nome'].value;
    this.item.CPF = controls['CPF'].value;
    this.item.DataNascimento = controls['DataNascimento'].value;

    return this.item;
  }

  onSubmit() {
    
    this.hasFormErrors = false;
    this.loadingAfterSubmit = false;
    const controls = this.form.controls;
    const editedItem = this.prepareItem();

    if (editedItem.DependenteID > 0) {
      this.updateItem(editedItem);
    } else {
      this.createItem(editedItem);
    }

  }

  updateItem(_clienteTipo: DependenteModel) {
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

  createItem(_clienteTipo: DependenteModel) {
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

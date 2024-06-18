import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTreeModule } from '@angular/material/tree';
import { MatDividerModule } from '@angular/material/divider';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { MatTableModule } from '@angular/material/table';
import { HttpClientModule } from '@angular/common/http';

import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { MatCheckboxModule } from '@angular/material/checkbox';
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatDateFormats, MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatRadioModule } from '@angular/material/radio';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CommonModule, registerLocaleData } from '@angular/common';
import ptBr from '@angular/common/locales/pt';

import { ListarPessoaComponent } from './pages/pessoa/listar-pessoa/listar-pessoa.component';
import { ActionNotificationComponent } from './shared/component/action-notification/action-notification.component';
import { ErrorDialogComponent } from './shared/component/error-dialog/error-dialog.component';
import { DeleteEntityDialogComponent } from './shared/component/delete-entity-dialog/delete-entity-dialog.component';
import { LayoutUtilsService } from './core/utils/layout-utils.service';
import { HttpUtilsService } from './core/utils/http-utils.service';
import { EditarPessoaComponent } from './pages/pessoa/editar-pessoa/editar-pessoa.component';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { DatePipe } from '@angular/common';
import { EditarDependenteComponent } from './pages/dependente/editar-dependente/editar-dependente.component';
import { ListarDependenteComponent } from './pages/dependente/listar-dependente/listar-dependente.component';

const maskConfig: Partial<IConfig> = {
  validation: false,
};
registerLocaleData(ptBr)
const MY_DATE_FORMATS: MatDateFormats = {
  parse: {
    dateInput: { day: 'numeric', month: 'numeric', year: '2-digit' },
  },
  display: {
    dateInput: 'input',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@NgModule({
  declarations: [
    AppComponent,
    ListarPessoaComponent,
    ActionNotificationComponent,
    ErrorDialogComponent,
    DeleteEntityDialogComponent,
    EditarPessoaComponent,
    ListarDependenteComponent,
    EditarDependenteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatTreeModule,
    MatDividerModule,
    CdkAccordionModule,
    MatTableModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    HttpClientModule,
    MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
    MatSelectModule,
    MatGridListModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatPaginatorModule,
    MatSortModule,
    MatSnackBarModule,
    MatProgressBarModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatExpansionModule,
    MatRadioModule,
    MatStepperModule,
    MatTabsModule,
    MatTooltipModule,
    NgxMaskModule.forRoot(maskConfig),
  ],
  providers: [
    {
      provide: MAT_DIALOG_DEFAULT_OPTIONS,
      useValue: {
        hasBackdrop: true,
        panelClass: 'm-mat-dialog-container__wrapper',
        height: 'auto',
        width: '900px'
      }
    },
    LayoutUtilsService,
    HttpUtilsService,
    DatePipe,
    // { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

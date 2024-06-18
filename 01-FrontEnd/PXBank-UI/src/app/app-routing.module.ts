import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarPessoaComponent } from './pages/pessoa/listar-pessoa/listar-pessoa.component';

const routes: Routes = [
  { path: 'pessoa/listar', component: ListarPessoaComponent, },
  { path: '', redirectTo: 'pessoa/listar', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

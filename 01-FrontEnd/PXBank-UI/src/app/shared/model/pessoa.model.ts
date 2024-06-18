import { BaseModel } from "./_base.model";

export class PessoaModel extends BaseModel {
    PessoaID: number = 0;
    Nome: string = "";
    Cpf: string = "";
    DepartamentoID: number = 0;
    Salario: number = 0;
    DataNascimento: Date = new Date();
    NumFilhos: number = 0;
    IsAtivo: boolean = true;
}
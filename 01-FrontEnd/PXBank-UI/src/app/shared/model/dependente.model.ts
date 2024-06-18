import { BaseModel } from "./_base.model";

export class DependenteModel extends BaseModel{
    DependenteID: number = 0;
	PessoaID: number = 0;
	Nome: string = "";
	CPF: string = "";
	DataNascimento: Date = new Date();
}
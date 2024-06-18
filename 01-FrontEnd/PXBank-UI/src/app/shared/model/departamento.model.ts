import { BaseModel } from "./_base.model";

export class DepartamentoModel extends BaseModel {
    DepartamentoID: number = 0;
    Nome: string = "";
    Descricao: string = "";
    DataCadastro: Date = new Date();
}
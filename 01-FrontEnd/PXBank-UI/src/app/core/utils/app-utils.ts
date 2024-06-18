import { DatePipe } from "@angular/common";
import { Injectable } from "@angular/core";
import { Observable, ReplaySubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class appUtils {

  constructor(
    public datepipe: DatePipe
  ) { }

  //Função para transformar o objeto Boolean em lingua portuguesa (Sim/Não). Ex: Tables <td>{{ fu.BooleanToString(dados.IsAtivo) }}</td>  => Utilizar no html
  // fu => Função que deverá ser escrita no .TS para retornar a classe utils
  BooleanToString(ativo: Boolean): String {
    return ativo == true ? "Sim" : "Não";
  }

  //Função para validar se objeto boolean não foi informada e retornar null para objeto => Utilizar no .TS
  StringToBolean(value: any): boolean {
    if (value == true)
      return true;
    if (value == false)
      return false;
    if (value == "true") {
      return true;
    } if (value == "false") {
      return false;
    } else {
      return false;
    }
  }

  //Função REGEX para colocar "." e "-" no objeto e retornar com máscara para o backend. => Utilizar no .TS
  FormatarCPF(cpf: String): String {
    //retira os caracteres indesejados...
    cpf = cpf?.toString().replace(/[^\d]/g, "");

    //realizar a formatação...
    return cpf?.toString().replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  }

  //Função REGEX para colocar "." e "-" no objeto e retornar com máscara para o backend. => Utilizar no .TS
  FormatarCNPJ(cnpj: String): string {
    //retira os caracteres indesejados...
    cnpj = cnpj?.toString().replace(/[^\d]/g, "");

    //realizar a formatação...
    return cnpj?.toString().replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
  }

  //Função para transformar o objeto Data em formato pt-br. Ex: Tables <td>{{ fu.DateToString(dados.DataCadastro) }}</td>  => Utilizar no html
  // fu => Função que deverá ser escrita no .TS para retornar a classe utils
  DateToString(data: Date): String {
    if (data) {
      return this.datepipe.transform(data, 'dd/MM/yyyy')!;
    } else {
      return "";
    }
  }

  //Função para transformar o objeto Data em formato pt-br. Ex: Tables <td>{{ fu.DateToString(dados.DataCadastro) }}</td>  => Utilizar no html
  // fu => Função que deverá ser escrita no .TS para retornar a classe utils
  DateTimeToString(data: Date): String {
    if (data) {
      return this.datepipe.transform(data, 'dd/MM/yyyy HH:mm:ss')!;
    } else {
      return "";
    }
  }

  TimeToString(data: Date): String {
    if (data) {
      return this.datepipe.transform(data, 'HH:mm:ss')!;
    } else {
      return "";
    }
  }

  //Função para converter o objeto (backend) em DATE para o frontend (Ex: input type="Date") => Utilizar no .TS
  DateToFormControl(data: any): any {
    if (data) {
      return new Date(data).toISOString().split("T")[0];
    } else {
      return null
    }
  }

  //Função para converter o objeto (backend) em DateTime para o frontend (Ex: input type="DateTime") => Utilizar no .TS
  DateTimeToFormControl(data: any): any {
    if (data) {
      return new Date(data);
    } else {
      return ""
    }
  }

  //Função para validar se a data não foi informada e retornar null para objeto => Utilizar no .TS
  FormControlToDate(value: any): any {
    if (value != "") {
      return value;
    } else {
      return null;
    }
  }

  //Obtem o trata o endereço vindo do maps
 /* ObterEndereco(jsonmaps): EnderecoMapsModel {

    let result = new EnderecoMapsModel();

    for (var i = 0; i < jsonmaps[0].address_components.length; i++) {
      if (jsonmaps[0].address_components[i].types[0] == 'street_number')
        result.Numero = jsonmaps[0].address_components[i].long_name;

      if (jsonmaps[0].address_components[i].types[0] == 'route')
        result.Endereco = jsonmaps[0].address_components[i].long_name;

      if (jsonmaps[0].address_components[i].types[1] == 'sublocality')
        result.Bairro = jsonmaps[0].address_components[i].long_name;

      if (jsonmaps[0].address_components[i].types[0] == 'administrative_area_level_2')
        result.Cidade = jsonmaps[0].address_components[i].short_name;

      if (jsonmaps[0].address_components[i].types[0] == 'administrative_area_level_1')
        result.UF = jsonmaps[0].address_components[i].short_name;

      if (jsonmaps[0].address_components[i].types[0] == 'postal_code')
        result.CEP = jsonmaps[0].address_components[i].long_name;

      if (jsonmaps[0].address_components[i].types[0] == 'country')
        result.Pais = jsonmaps[0].address_components[i].short_name;
    }

    return result;
  }*/

  // transforma decimal em uma string  no padrao de moeda brasileira
  DecimalToString(money: number) {
    // ^\$?[\d,]+(\.\d*)?$

    if(money == null){
      return "";
    }

    var f = money.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });

    var aux = f;

    f = f.toString().replace('.', ',');
    let index = aux.indexOf(".");
    f = f.substring(0, index) + "." + f.substring(index + 1);

    if (f[0] == '.') {
      f = f.substring(1);
    }
    return f;
  }

  CreateSLA(tipoDuracao: string, reacao: number, solucao: number, total: number) {
    //05D(R), 10D(S) = 10D(T)
    let SLA = "";
    SLA += reacao + tipoDuracao + '(R), ';
    SLA += solucao + tipoDuracao + '(S), ';
    SLA += total + tipoDuracao + '(T)';

    return SLA;
  }

  //Transforma string Moeda em decimal
  CurrentToNumber(f: string){
   f = f.replace('.', '');
   f = f.replace(",",'.');
    return f;
  }

  // CreateTimeByMinutes(dados: DataModel, tipo, sla) {

  //   if (!dados) {
  //     return "";
  //   }

  //   if (tipo == this.appTipoDuracaoSLA.Dias) {

  //     let aux = "";

  //     if (sla < dados.dias + (dados.horas / 100)) {
  //       aux = '<span class="text-danger">Total: ';
  //     } else {
  //       aux = "<span>";
  //     }

  //     aux += dados.dias + " Dias e " + dados.horas + " Horas";
  //     aux += "</span>";

  //     return aux;
  //   } else {

  //     let aux = "";

  //     if (sla < dados.horas + (dados.minutos / 100)) {
  //       aux = 'Total: <span class="text-danger">';
  //     } else {
  //       aux = "<span>";
  //     }

  //     aux += dados.horas + " Horas e " + dados.minutos + " Minutos";
  //     aux += "</span>";

  //     return aux;
  //   }
  // }
}

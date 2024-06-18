import { AbstractControl, ValidatorFn, Validators } from "@angular/forms";
import { appValidarCPF_CNPJ } from "./app-validar-cpf-cnpj";

export class CustomValidator {
    constructor() {}
 
    /**
     * Valida se o CPF informado é valido.
    */
    static isCPFValido(): ValidatorFn  {
      return (control: AbstractControl): Validators   => {
        const cpf = control.value;
        if (cpf) {
            var validado = appValidarCPF_CNPJ.isCpfValid(cpf);
            if(validado == false)
            {
              return { cpfNotValid: true };
            }
            return false;
          } else {
            return { cpfNotValid: true };
          }
       }
   };
}

using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PXBank.Business.CustomAttributes
{
    public class CPFAttribute : ValidationAttribute
    {
        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            if (value == null || string.IsNullOrWhiteSpace(value.ToString()))
            {
                return ValidationResult.Success; // CPF vazio é válido (ou pode-se decidir tornar isso inválido)
            }

            string cpf = value.ToString().Replace(".", "").Replace("-", "");

            if (cpf.Length != 11 || !cpf.All(char.IsDigit))
            {
                return new ValidationResult("CPF deve conter 11 dígitos numéricos.");
            }

            if (!IsValidCPF(cpf))
            {
                return new ValidationResult("CPF inválido.");
            }

            return ValidationResult.Success;
        }

        private bool IsValidCPF(string cpf)
        {
            if (cpf.All(c => c == cpf[0])) // Verifica se todos os dígitos são iguais
            {
                return false;
            }

            int[] multiplicadores1 = { 10, 9, 8, 7, 6, 5, 4, 3, 2 };
            int[] multiplicadores2 = { 11, 10, 9, 8, 7, 6, 5, 4, 3, 2 };

            string tempCpf = cpf.Substring(0, 9);
            string digito = CalculateDigit(tempCpf, multiplicadores1);
            tempCpf += digito;
            digito += CalculateDigit(tempCpf, multiplicadores2);

            return cpf.EndsWith(digito);
        }

        private string CalculateDigit(string cpf, int[] multiplicadores)
        {
            int soma = 0;
            for (int i = 0; i < multiplicadores.Length; i++)
            {
                soma += int.Parse(cpf[i].ToString()) * multiplicadores[i];
            }
            int resto = soma % 11;
            return resto < 2 ? "0" : (11 - resto).ToString();
        }
    }
}
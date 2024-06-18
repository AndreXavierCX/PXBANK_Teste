using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PXBank.Business.Constantes
{
    public static class Erro
    {
        public const string Generico = "400-1";
        public const string GenericoMensagemBackEnd = "400-100";
        public const string GenericoMobile = "400-2";
        public const string GenericoComTexto = "400-3";
        public const string GenericoNulo = "400-4";
        public const string RegistrosRelacionados = "400-5";
        public const string RegistroChave = "400-6";
        public const string NaoFoiPossivelExcluir = "400-7";
        public const string GenericoEmail = "400-8";
        public const string CPFExistente = "400-10";

        public static string GetValue(string valor)
        {
            var result = "";
            switch (valor)
            {
                case Generico: result = "Ocorreu um erro inesperado e nossa equipe receberá essa informação, por gentileza, aguarde um instante e tente novamente ou envie um e-mail para o nosso suporte."; break;
                case GenericoEmail: result = "Ocorreu um erro no envio do e-mail, por gentileza, verifique o e-mail do destinário."; break;
                case GenericoMobile: result = "Ocorreu um erro inesperado e nossa equipe receberá essa informação.\nPor gentileza, aguarde um instante e tente novamente ou entre em contato com o administrador do sistema."; break;
                case GenericoComTexto: result = "Ocorreu o erro {0}, por gentileza, aguarde um instante e tente novamente ou envie um e-mail para o nosso suporte."; break;
                case GenericoNulo: result = "Sua internet está lenta e não foi possível enviar os dados para o servidor.\nPor gentileza, aguarde um instante e tente novamente ou entre em contato com o administrador do sistema."; break;
                case RegistrosRelacionados: result = "Existem outros registros relacionados ao item selecionado.\nExclusão não realizada!"; break;
                case RegistroChave: result = "Este item é chave da tabela e não pode ser excluído."; break;
                case NaoFoiPossivelExcluir: result = "Não foi possível realizar a exclusão do registro."; break;
                case CPFExistente: result = "CPF já cadastrado em nosso sistema. Favor contactar no suporte!"; break;
                default: result = ""; break;
            }
            return result;
        }
    }
}

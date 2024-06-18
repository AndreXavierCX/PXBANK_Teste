using System;

namespace PXBank.Business.CustomException
{
    /// <summary>
    /// Classe responsável por as exceções controladas pelo sistema
    /// </summary>
    [Serializable]
    public class CustomException : Exception
    {
        public string? Codigo { get; }
        public string? Erro { get; }
        public string? Inner_Exception { get; }

        public CustomException() { }

        /// <summary>
        /// Exceção Padrão 
        /// </summary>
        /// <param name="codigo">Obtém a mensagem pelo código da constante erro. Opcional</param>
        /// <param name="message">Mensagem de erro a ser enviada para o request. Opcional</param>
        public CustomException(string? codigo, string? message)
            : base(message)
        {

            if (String.IsNullOrEmpty(codigo))
                this.Codigo = Constantes.Erro.Generico;
            else
                this.Codigo = codigo;

            if (String.IsNullOrEmpty(message))
                this.Erro = Constantes.Erro.GetValue(this.Codigo);
            else
                this.Erro = message;

        }

        public CustomException(string codigo, string message, Exception inner)
            : base(message, inner)
        {

            if (String.IsNullOrEmpty(codigo))
                this.Codigo = Constantes.Erro.Generico;
            else
                this.Codigo = codigo;

            this.Erro = message;
            this.Inner_Exception = inner.ToString();
        }

        /// <summary>
        /// Exceção padrão com mensagem customizada pelo programador
        /// </summary>
        /// <param name="message">Mensagem de erro.</param>
        public CustomException(string message)
            : base(message)
        {
            this.Codigo = Constantes.Erro.Generico;
            this.Erro = message;
        }

        /// <summary>
        /// Serializa a string de mensagem
        /// </summary>
        /// <returns></returns>
        /*public override string ToString()
        {
            return JsonSerializer.Serialize( new { Codigo = this.Codigo, Mensagem = this.Erro, InnerException = this.Inner_Exception});
        }*/

        /// <summary>
        /// Serializa a string de mensagem
        /// </summary>
        /// <returns>JSON Object para ser retornado através do BadRequest</returns>
        public object ToBadRequest()
        {
            return new { Codigo = this.Codigo, Mensagem = this.Erro, InnerException = this.Inner_Exception };
        }
    }
}

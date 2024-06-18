using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using PXBank.Business.CustomAttributes;

namespace PXBank.Business.Entity
{
    [Table("pessoa")]
    public class Pessoa
    {
        [Key]
        [Column("pessoaid")]
        public int PessoaID { get; set; }

        [Required]
        [StringLength(100)]
        [Column("nome")]
        public string Nome { get; set; }

        [Required]
        [StringLength(50)]
        [Column("cpf")]
        [CPF(ErrorMessage = "CPF inválido.")]
        public string Cpf { get; set; }

        [Required]
        [Column("departamentoid")]
        public int DepartamentoID { get; set; }

        [Required]
        [Column("salario", TypeName = "decimal(10, 2)")]
        public decimal Salario { get; set; }

        [Required]
        [Column("datanascimento")]
        public DateTime DataNascimento { get; set; }

        [Required]
        [Column("numfilhos")]
        public int NumFilhos { get; set; }

        [Required]
        [Column("isativo")]
        public bool IsAtivo { get; set; }

        public ICollection<Dependente>? Dependente { get; set; }

        public Departamento? Departamento { get; set; }

    }
}

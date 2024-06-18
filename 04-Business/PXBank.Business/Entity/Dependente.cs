using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PXBank.Business.Entity
{
    [Table("dependente")]
    public class Dependente
    {
        [Key]
        [Column("dependenteid")]
        public int DependenteID { get; set; }

        [Required]
        [Column("pessoaid")]
        public int PessoaID { get; set; }

        [Required]
        [StringLength(100)]
        [Column("nome")]
        public string Nome { get; set; }

        [Required]
        [StringLength(100)]
        [Column("cpf")]
        public string CPF { get; set; }

        [Required]
        [Column("datanascimento")]
        public DateTime DataNascimento { get; set; }

        [ForeignKey("PessoaID")]
        public Pessoa? Pessoa { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PXBank.Business.Entity
{
    [Table("departamento")]
    public class Departamento
    {
        [Key]
        [Column("departamentoid")]
        public int DepartamentoID { get; set; }

        [Required]
        [StringLength(100)]
        [Column("nome")]
        public string Nome { get; set; }

        [StringLength(500)]
        [Column("descricao")]
        public string Descricao { get; set; }

        [Column("datacadastro")]
        public DateTime DataCadastro { get; set; }

        public virtual ICollection<Pessoa>? Pessoas { get; set; }
    }
}

using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using PXBank.Business.Context.Interface;
using PXBank.Business.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PXBank.Business.Context
{
    public class DataContext : DbContext, IUnitOfWork
    {
        protected readonly IConfiguration Configuration;

        public DataContext(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public void Save()
        {
            base.SaveChanges();
        }

        protected override void OnConfiguring(DbContextOptionsBuilder options)
        {
            options.UseNpgsql(Configuration.GetConnectionString("DefaultConnection"));
        }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Pessoa>()
            .HasOne(p => p.Departamento)
            .WithMany(d => d.Pessoas)
            .HasForeignKey(p => p.DepartamentoID);

            modelBuilder.Entity<Dependente>()
            .HasOne(d => d.Pessoa)
            .WithMany(p => p.Dependente)
            .HasForeignKey(d => d.PessoaID);

            base.OnModelCreating(modelBuilder);
        }

        public DbSet<Departamento> Departamento { get; set; }
        public DbSet<Pessoa> Pessoa { get; set; }
        public DbSet<Dependente> Dependente { get; set; }



    }
}


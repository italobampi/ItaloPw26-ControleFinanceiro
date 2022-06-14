package br.edu.utfpr.pb.pw26s.server.model;

import br.edu.utfpr.pb.pw26s.server.model.tipo.TipoMovimentaçao;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.util.Date;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = {"id"})
public class Movimentacao implements Serializable {
    @Id
    @GeneratedValue
    private Long id;




    @NotNull
    @Column(nullable = false)
    private Double valor;

    @NotNull
    @Column(nullable = false)
    private Double valorPago;

    private  String categoria;

    @Column(nullable = true)
    private Date dataVencimento;

    @Column(nullable = true)
    private Date dataPagamento;

    @NotNull
    @Size(min = 2, max = 1024)
    @Column(length = 1024, nullable = false)
    private String descricao;

    @ManyToOne
    @JoinColumn(name = "conta_id", referencedColumnName = "id")
    private Conta conta;

@NotNull
@Enumerated(EnumType.ORDINAL)
    private TipoMovimentaçao tipoMovimentacao;
}

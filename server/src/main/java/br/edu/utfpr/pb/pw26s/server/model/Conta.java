package br.edu.utfpr.pb.pw26s.server.model;

import br.edu.utfpr.pb.pw26s.server.model.tipo.TipoConta;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = {"id"})
public class Conta implements Serializable {

    @Id
    @GeneratedValue
    private Long id;



    @NotNull
    private String numero;
    @NotNull
    private String agencia;
    @NotNull
    private String banco;

    @NotNull
    @Enumerated(EnumType.STRING)
    private TipoConta tipoConta;
    @ManyToOne
    @JoinColumn(name = "user_id")
    @NotNull
    private Usuario usuario;
}

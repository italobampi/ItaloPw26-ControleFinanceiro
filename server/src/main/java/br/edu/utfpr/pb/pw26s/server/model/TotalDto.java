package br.edu.utfpr.pb.pw26s.server.model;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class TotalDto {
    Double totalDespesa;
    Double totalReceita;
    Double totalMovimentacao;
    Double total;

    public TotalDto(Double totalDespesa, Double totalReceita, Double totalMovimentacao, Double total) {
        this.totalDespesa = totalDespesa;
        this.totalReceita = totalReceita;
        this.totalMovimentacao = totalMovimentacao;
        this.total = total;
    }


}

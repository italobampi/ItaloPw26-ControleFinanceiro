package br.edu.utfpr.pb.pw26s.server.service;

import br.edu.utfpr.pb.pw26s.server.model.Movimentacao;
import br.edu.utfpr.pb.pw26s.server.model.tipo.TipoMovimentaçao;

import java.util.List;

public interface MovimentacaoService extends CrudService<Movimentacao, Long> {

    List<Movimentacao> findByDescricaoContaining(String description);
    List<Movimentacao> findByContaUsuarioId(Long id);
    List<Movimentacao> findByTipoMovimentacaoAndContaUsuario(TipoMovimentaçao tipoMovimentaçao, Long id);

}

package br.edu.utfpr.pb.pw26s.server.service;

import br.edu.utfpr.pb.pw26s.server.model.Movimentacao;

import java.util.List;

public interface MovimentacaoService extends CrudService<Movimentacao, Long> {

    List<Movimentacao> findByDescricaoContaining(String description);

}

package br.edu.utfpr.pb.pw26s.server.repository;

import br.edu.utfpr.pb.pw26s.server.model.Movimentacao;
import br.edu.utfpr.pb.pw26s.server.model.tipo.TipoMovimentaçao;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MovimentacaoRepository extends JpaRepository<Movimentacao, Long> {

    List<Movimentacao> findByDescricaoContaining(String description);
    List<Movimentacao> findByContaUsuarioId(Long id);
    List<Movimentacao> findByTipoMovimentacaoAndContaUsuarioId(TipoMovimentaçao tipoMovimentaçao,Long id);


}

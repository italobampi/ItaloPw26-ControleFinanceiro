package br.edu.utfpr.pb.pw26s.server.service.impl;

import br.edu.utfpr.pb.pw26s.server.model.Movimentacao;
import br.edu.utfpr.pb.pw26s.server.model.tipo.TipoMovimentaçao;
import br.edu.utfpr.pb.pw26s.server.repository.MovimentacaoRepository;
import br.edu.utfpr.pb.pw26s.server.service.MovimentacaoService;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MovimentacaoServiceImpl extends CrudServiceImpl<Movimentacao, Long>
        implements MovimentacaoService {

    private MovimentacaoRepository movimentacaoRepository;

    public MovimentacaoServiceImpl(MovimentacaoRepository movimentacaoRepository) {
        this.movimentacaoRepository = movimentacaoRepository;
    }

    @Override
    protected JpaRepository<Movimentacao, Long> getRepository() {
        return this.movimentacaoRepository;
    }

    @Override
    public List<Movimentacao> findByDescricaoContaining(String description) {
        return movimentacaoRepository.findByDescricaoContaining(description);
    }

    @Override
    public List<Movimentacao> findByContaUsuarioId(Long id) {
        return movimentacaoRepository.findByContaUsuarioId(id);
    }

    @Override
    public List<Movimentacao> findByTipoMovimentacaoAndContaUsuario(TipoMovimentaçao tipoMovimentaçao, Long id) {
       return movimentacaoRepository.findByTipoMovimentacaoAndContaUsuarioId(tipoMovimentaçao, id);
    }
}

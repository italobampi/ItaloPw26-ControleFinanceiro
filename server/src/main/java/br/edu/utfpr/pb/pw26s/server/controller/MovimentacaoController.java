package br.edu.utfpr.pb.pw26s.server.controller;

import br.edu.utfpr.pb.pw26s.server.model.Movimentacao;
import br.edu.utfpr.pb.pw26s.server.model.Total;
import br.edu.utfpr.pb.pw26s.server.model.tipo.TipoMovimentaçao;
import br.edu.utfpr.pb.pw26s.server.service.CrudService;
import br.edu.utfpr.pb.pw26s.server.service.MovimentacaoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("movimentacoes")
public class MovimentacaoController extends CrudController<Movimentacao, Long> {

    @Autowired
    private MovimentacaoService movimentacaoService;

    @Override
    protected CrudService<Movimentacao, Long> getService() {
        return this.movimentacaoService;
    }


    @GetMapping("descricao")
    public List<Movimentacao> findByDescription(@RequestParam("desc") String desc) {
        return this.movimentacaoService.findByDescricaoContaining(desc);
    }
    @GetMapping("user/{id}")
    protected List<Movimentacao> findByContaUsuarioId(@PathVariable  Long id ){
        return this.movimentacaoService.findByContaUsuarioId(id);
    }
    @GetMapping("user/despesa/{id}")
    protected List<Movimentacao> findDespesaByContaUsuarioId(@PathVariable  Long id ){
        return this.movimentacaoService.findByTipoMovimentacaoAndContaUsuario(TipoMovimentaçao.DESPESA,id);
    }
    @GetMapping("user/receita/{id}")
    protected List<Movimentacao> findReceitaByContaUsuarioId(@PathVariable  Long id ){
        return this.movimentacaoService.findByTipoMovimentacaoAndContaUsuario(TipoMovimentaçao.RECEITA,id);
    }
    @GetMapping("saldo/receita/{id}")
    protected Total findSaldoReceitaByContaUsuarioId(@PathVariable  Long id ){
        Double total =0.0;
        List<Movimentacao> movimentacaos =
                this.movimentacaoService.findByTipoMovimentacaoAndContaUsuario(TipoMovimentaçao.RECEITA,id);
        for (Movimentacao movimentacao: movimentacaos){
            total+= movimentacao.getValorPago();
        }
        return new Total(total);
    }
    @GetMapping("saldo/despesa/{id}")
    protected Total findSaldoDespesaByContaUsuarioId(@PathVariable  Long id ){
        Double total =0.0;
        List<Movimentacao> movimentacaos =
                this.movimentacaoService.findByTipoMovimentacaoAndContaUsuario(TipoMovimentaçao.DESPESA,id);
        for (Movimentacao movimentacao: movimentacaos){
            total+= movimentacao.getValorPago();
        }
        return new Total(total);
    }
    @GetMapping("saldo/{id}")
    protected Total findSaldoByContaUsuarioId(@PathVariable  Long id ){
        Double total =0.0;
        List<Movimentacao> movimentacaos = this.movimentacaoService.findByContaUsuarioId(id);
        for (Movimentacao movimentacao: movimentacaos){
            total+= movimentacao.getValorPago();
        }
        return new Total(total);
    }
    @PostMapping("/{id}")
    protected void saveTransferencia(@PathVariable Long id, @RequestBody @Valid Movimentacao movimentacao){
        movimentacao =this.movimentacaoService.save(movimentacao);
        movimentacao.setTipoMovimentacao(TipoMovimentaçao.RECEITA);
        movimentacao.setDescricao(movimentacao.getDescricao()+ "  Transferencia de "+movimentacao.getConta().getNumero());
        movimentacao.getConta().setId(id);
        movimentacao.setId(null);
        movimentacaoService.save(movimentacao);

    }

}

package br.edu.utfpr.pb.pw26s.server.controller;

import br.edu.utfpr.pb.pw26s.server.model.Conta;
import br.edu.utfpr.pb.pw26s.server.model.Movimentacao;
import br.edu.utfpr.pb.pw26s.server.model.TotalDto;
import br.edu.utfpr.pb.pw26s.server.model.tipo.TipoMovimentaçao;
import br.edu.utfpr.pb.pw26s.server.repository.ContaRepository;
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

    @Autowired
    ContaRepository contaRepository;

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
    @GetMapping("user/transferencia/{id}")
    protected List<Movimentacao> findTranferenciaByContaUsuarioId(@PathVariable  Long id ){
        return this.movimentacaoService.findByTipoMovimentacaoAndContaUsuario(TipoMovimentaçao.TRANSFERENCIA,id);
    }
    @GetMapping("saldo/{id}")
    protected TotalDto findSaldoReceitaByContaUsuarioId(@PathVariable  Long id ){
        TotalDto total= new TotalDto(0d,0d,0d,0d);
        List<Movimentacao> movimentacaos =
                this.movimentacaoService.findByContaUsuarioId(id);
        for (Movimentacao movimentacao: movimentacaos){
            if (movimentacao.getTipoMovimentacao()==TipoMovimentaçao.RECEITA){
                total.setTotalReceita(total.getTotalReceita()+ movimentacao.getValorPago());
                total.setTotal(total.getTotal()+ movimentacao.getValorPago());
            }else if (movimentacao.getTipoMovimentacao()==TipoMovimentaçao.DESPESA){
                total.setTotalDespesa(total.getTotalDespesa()+ movimentacao.getValorPago());
                total.setTotal(total.getTotal()- movimentacao.getValorPago());
            }else if (movimentacao.getTipoMovimentacao()==TipoMovimentaçao.TRANSFERENCIA){
                total.setTotalMovimentacao(total.getTotalMovimentacao()+ movimentacao.getValorPago());
                total.setTotal(total.getTotal()+ movimentacao.getValorPago());
            }
        }
        return  total;
    }


    @PostMapping("/{id}")
    protected void saveTransferencia(@PathVariable Long id, @RequestBody @Valid Movimentacao movimentacao){
        movimentacao = this.movimentacaoService.save(movimentacao);
        Movimentacao m2 = new Movimentacao();
        m2.setTipoMovimentacao(TipoMovimentaçao.RECEITA);
        m2.setValor(movimentacao.getValor());
        m2.setCategoria(movimentacao.getCategoria());
        m2.setDataVencimento(movimentacao.getDataVencimento());
        m2.setDataPagamento(movimentacao.getDataPagamento());
        m2.setValorPago(movimentacao.getValorPago());
        Conta conta = contaRepository.findById(movimentacao.getConta().getId()).orElse(null);
        m2.setDescricao(movimentacao.getDescricao()+ "  Transferencia de "+ conta.getNumero());

        m2.setConta(contaRepository.findById(id).orElse(new Conta()));
        movimentacaoService.save(m2);

    }

}

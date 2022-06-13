package br.edu.utfpr.pb.pw26s.server.controller;

import br.edu.utfpr.pb.pw26s.server.model.Movimentacao;
import br.edu.utfpr.pb.pw26s.server.service.CrudService;
import br.edu.utfpr.pb.pw26s.server.service.MovimentacaoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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

}

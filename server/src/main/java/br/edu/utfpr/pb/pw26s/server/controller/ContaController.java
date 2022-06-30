package br.edu.utfpr.pb.pw26s.server.controller;

import br.edu.utfpr.pb.pw26s.server.model.Conta;
import br.edu.utfpr.pb.pw26s.server.model.Usuario;
import br.edu.utfpr.pb.pw26s.server.service.ContaService;
import br.edu.utfpr.pb.pw26s.server.service.CrudService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("contas")
public class ContaController extends CrudController<Conta, Long> {

    @Autowired
    private ContaService contaService;


    @Override
    protected CrudService<Conta, Long> getService() {
        return contaService;
    }

    @GetMapping("user/{id}")
    public List<Conta> listacontas(@PathVariable Long id) {
        return contaService.findAllByUsuario_Id(id);
    }

    @GetMapping("recebe/{numero}")
    public Conta findByNumeroAndAgenciaAndBanco(@PathVariable String numero) {
        return contaService.findByNumero(numero);
    }
}

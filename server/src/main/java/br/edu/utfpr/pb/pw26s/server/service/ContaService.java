package br.edu.utfpr.pb.pw26s.server.service;

import br.edu.utfpr.pb.pw26s.server.model.Conta;
import br.edu.utfpr.pb.pw26s.server.model.Usuario;

import java.util.List;

public interface ContaService extends CrudService<Conta, Long> {
    List<Conta> findAllByUsuario_Id(Long id);
}

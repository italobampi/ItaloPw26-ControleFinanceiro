package br.edu.utfpr.pb.pw26s.server.service.impl;

import br.edu.utfpr.pb.pw26s.server.model.Conta;
import br.edu.utfpr.pb.pw26s.server.model.Usuario;
import br.edu.utfpr.pb.pw26s.server.repository.ContaRepository;
import br.edu.utfpr.pb.pw26s.server.service.ContaService;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ContaServiceImpl extends CrudServiceImpl<Conta, Long>
        implements ContaService {

    private ContaRepository contaRepository;

    public ContaServiceImpl(ContaRepository contaRepository) {
        this.contaRepository = contaRepository;
    }

    @Override
    protected JpaRepository<Conta, Long> getRepository() {
        return this.contaRepository;
    }


    @Override
    public List<Conta> findAllByUsuario_Id(Long id) {
        return contaRepository.findAllByUsuario_Id(id);
    }

    @Override
    public Conta findByNumero(String numero) {
        return contaRepository.findByNumero(numero);
    }
}


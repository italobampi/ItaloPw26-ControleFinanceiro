package br.edu.utfpr.pb.pw26s.server;

import br.edu.utfpr.pb.pw26s.server.model.Conta;
import br.edu.utfpr.pb.pw26s.server.model.Usuario;
import br.edu.utfpr.pb.pw26s.server.model.tipo.TipoConta;
import br.edu.utfpr.pb.pw26s.server.repository.ContaRepository;
import br.edu.utfpr.pb.pw26s.server.repository.UsuarioRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.context.ActiveProfiles;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

@DataJpaTest
@ActiveProfiles("test")
public class ContaRepositoryTests {
    @Autowired
    TestEntityManager testEntityManager;

    @Autowired
    ContaRepository contaRepository;

    @Autowired
    UsuarioRepository usuarioRepository;


    Usuario usuario;

    @Test
    public void findByUsuarioId_whenContasExists_returnsContas() {

        testEntityManager.persist(createValidConta());

        List<Conta> conta = contaRepository.findAllByUsuario_Id(usuario.getId());
        assertThat(conta).isNotNull();
    }

    @Test
    public void findByUsername_whenUserExists_returnsNull() {
        Long aLong= Long.valueOf(10);
        List<Conta> contaDb = contaRepository.findAllByUsuario_Id(aLong);
        assertThat(contaDb).isNotNull();
    }



    private Conta createValidConta() {
        Usuario usuario = createValidUser();
        usuario = usuarioRepository.save(usuario);
        Conta conta = new Conta();
        conta.setTipoConta(TipoConta.CC);
        conta.setAgencia("123123");
        conta.setBanco("12312");
        conta.setNumero("123123");
        conta.setUsuario(usuario);
        return conta;
    }
    private Usuario createValidUser() {
        Usuario usuario = new Usuario();
        usuario.setUsername("test-user");
        usuario.setNome("test-display");
        // usuario.setEmail("email@123");
        usuario.setPassword("P4ssword");
        this.usuario=usuario;
        return usuario;
    }
}




package br.edu.utfpr.pb.pw26s.server;

import br.edu.utfpr.pb.pw26s.server.model.Usuario;
import br.edu.utfpr.pb.pw26s.server.repository.UsuarioRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.context.ActiveProfiles;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

@DataJpaTest
@ActiveProfiles("test")
public class UsuarioRepositoryTest {

    @Autowired
    TestEntityManager testEntityManager;
    @Autowired
    UsuarioRepository usuarioRepository;

    @Test
    public void findByUsername_whenUserExists_returnsUser() {
        Usuario usuario = new Usuario();
        usuario.setNome("test-displayName");
        usuario.setUsername("test-username");
        usuario.setPassword("P4ssword");
        testEntityManager.persist(usuario);

        Usuario usuarioDB = usuarioRepository.findByUsername("test-username");
        assertThat(usuarioDB).isNotNull();
    }

    @Test
    public void findByUsername_whenUserExists_returnsNull() {
        Usuario usuarioDB = usuarioRepository.findByUsername("test-username");
        assertThat(usuarioDB).isNull();
    }

}

package br.edu.utfpr.pb.pw26s.server;

import br.edu.utfpr.pb.pw26s.server.error.ApiError;
import br.edu.utfpr.pb.pw26s.server.model.Conta;
import br.edu.utfpr.pb.pw26s.server.model.Usuario;

import br.edu.utfpr.pb.pw26s.server.model.tipo.TipoConta;
import br.edu.utfpr.pb.pw26s.server.repository.ContaRepository;
import br.edu.utfpr.pb.pw26s.server.repository.UsuarioRepository;

import br.edu.utfpr.pb.pw26s.server.shared.GenericResponse;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.ActiveProfiles;

import static org.assertj.core.api.Assertions.assertThat;


@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles("test")
class ContaControllerTests {

    @Autowired
    TestRestTemplate testRestTemplate ;
    @Autowired
    ContaRepository contaRepository;
    @Autowired
    UsuarioRepository usuarioRepository;

    @BeforeEach
    public void cleanup() {
        contaRepository.deleteAll();
        testRestTemplate.getRestTemplate().getInterceptors().clear();
    }

    @Test
    public void postConta_whenContaIsValid_receiveOk() {
        Conta conta = createValidConta();
        ResponseEntity<Object> response = postSignup(conta, Object.class);
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
    }

    @Test
    public void postConta_whenContaIsValid_contaSavedToDatabase() {
        Conta conta = createValidConta();

        postSignup(conta, Object.class);
        assertThat( contaRepository.count() ).isEqualTo(1);
    }
    @Test
    public void postConta_whenContaIsValid_receiveSuccessMessage() {
        Conta conta = createValidConta();
        ResponseEntity<GenericResponse> response = postSignup(conta, GenericResponse.class);
        assertThat(response.getBody().getMessage()).isNotNull();
    }

    @Test
    public void postConta_whenContaHasNullUsuario_receiveBadRequest() {
       Conta conta = createValidConta();
               conta.setUsuario(null);
        ResponseEntity<Object> response = postSignup(conta, Object.class);
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
    }
    @Test
    public void postConta_whenContaHasNullTipo_receiveBadRequest() {
        Conta conta = createValidConta();
        conta.setTipoConta(null);
        ResponseEntity<Object> response = postSignup(conta, Object.class);
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
    }
    @Test
    public void postconta_whencontaIsInvalid_receiveApiError(){
        ResponseEntity<ApiError> response = postSignup(new Conta(), ApiError.class);
        assertThat(response.getBody().getUrl()).isEqualTo("/contas");
    }



    public <T> ResponseEntity<T> postSignup(Object request, Class<T> responseType) {
        return testRestTemplate.postForEntity("/contas", request, responseType);
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
        usuario.setPassword("P4ssword");
        return usuario;
    }
}

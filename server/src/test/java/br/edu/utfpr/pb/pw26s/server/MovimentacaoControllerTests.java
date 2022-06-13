package br.edu.utfpr.pb.pw26s.server;

import br.edu.utfpr.pb.pw26s.server.error.ApiError;
import br.edu.utfpr.pb.pw26s.server.model.Conta;
import br.edu.utfpr.pb.pw26s.server.model.Movimentacao;
import br.edu.utfpr.pb.pw26s.server.model.Usuario;

import br.edu.utfpr.pb.pw26s.server.model.tipo.TipoConta;
import br.edu.utfpr.pb.pw26s.server.model.tipo.TipoMovimentaçao;
import br.edu.utfpr.pb.pw26s.server.repository.ContaRepository;
import br.edu.utfpr.pb.pw26s.server.repository.MovimentacaoRepository;
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

import java.util.Date;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles("test")
public class MovimentacaoControllerTests {
    @Autowired
    TestRestTemplate testRestTemplate ;
    @Autowired
    ContaRepository contaRepository;
    @Autowired
    UsuarioRepository usuarioRepository;
    @Autowired
    MovimentacaoRepository movimentacaoRepository;

    @BeforeEach
    public void cleanup() {
        movimentacaoRepository.deleteAll();
        testRestTemplate.getRestTemplate().getInterceptors().clear();
    }

    @Test
    public void postMovimentacao_whenMovimentacaoIsValid_receiveOk() {
        Movimentacao movimentacao = createValidMovimentacao();
        ResponseEntity<Object> response = postSignup(movimentacao, Object.class);
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
    }
    @Test
    public void postMovimentacao_whenMovimentacaoIsValid_MovimentacaoSavedToDatabase() {
        Movimentacao movimentacao = createValidMovimentacao();

        postSignup(movimentacao, Object.class);
        assertThat( movimentacaoRepository.count() ).isEqualTo(1);
    }
    @Test
    public void postMovimentacao_whenMovimentacaoIsValid_receiveSuccessMessage() {
        Movimentacao movimentacao = createValidMovimentacao();
        ResponseEntity<GenericResponse> response = postSignup(movimentacao, GenericResponse.class);
        assertThat(response.getBody().getMessage()).isNotNull();
    }

    @Test
    public void postMovimentacao_whenMovimentacaoHasNullConta_receiveBadRequest() {
        Movimentacao movimentacao = createValidMovimentacao();
        movimentacao.setConta(null);
        ResponseEntity<Object> response = postSignup(movimentacao, Object.class);
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
    }
    @Test
    public void postMovimentacao_whenMovimentacaoHasNullTipo_receiveBadRequest() {
        Movimentacao movimentacao = createValidMovimentacao();
        //movimentacao.setTipoMovimentaçao(null);
        ResponseEntity<Object> response = postSignup(movimentacao, Object.class);
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
    }
    @Test
    public void postMovimentacao_whenMovimentacaoIsInvalid_receiveApiError(){
        ResponseEntity<ApiError> response = postSignup(new Movimentacao(), ApiError.class);
        assertThat(response.getBody().getUrl()).isEqualTo("/movimentacoes");
    }





    public <T> ResponseEntity<T> postSignup(Object request, Class<T> responseType) {
        return testRestTemplate.postForEntity("/movimentacoes", request, responseType);
    }
    private Movimentacao createValidMovimentacao(){
        Conta conta = createValidConta();

        Movimentacao movimentacao = new Movimentacao();
        movimentacao.setConta( contaRepository.save(conta));
        movimentacao.setDataPagamento(new Date(2020,10,22));
        movimentacao.setDataVencimento(new Date(2021,11,22));
        movimentacao.setTipoMovimentaçao(TipoMovimentaçao.DESPESA);
        movimentacao.setValor(1000.0);
        movimentacao.setValorPago(1000.0);
        movimentacao.setCategoria("dsf");
        movimentacao.setDescricao("dsfsdf");
        return movimentacao;
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
        return usuario;
    }
}

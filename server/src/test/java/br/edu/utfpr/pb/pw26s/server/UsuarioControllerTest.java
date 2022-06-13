package br.edu.utfpr.pb.pw26s.server;

import br.edu.utfpr.pb.pw26s.server.error.ApiError;
import br.edu.utfpr.pb.pw26s.server.model.Usuario;
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

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles("test")
public class UsuarioControllerTest {

    public static final String URL_USERS = "/users";
    @Autowired
    TestRestTemplate testRestTemplate;
    @Autowired
    UsuarioRepository usuarioRepository;

    @BeforeEach
    public void cleanup() {
        usuarioRepository.deleteAll();
        testRestTemplate.getRestTemplate().getInterceptors().clear();
    }

    @Test
    public void postUser_whenUserIsValid_receiveOk() {
        Usuario usuario = createValidUser();
        ResponseEntity<Object> response = postSignup(usuario, Object.class);
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
    }

    @Test
    public void postUser_whenUserIsValid_userSavedToDatabase() {
        Usuario usuario = createValidUser();
        postSignup(usuario, Object.class);
        assertThat(usuarioRepository.count()).isEqualTo(1);
    }


    @Test
    public void postUser_whenUserIsValid_receiveSuccessMessage() {
        Usuario usuario = createValidUser();
        ResponseEntity<GenericResponse> response = postSignup(usuario, GenericResponse.class);
        assertThat(response.getBody().getMessage()).isNotNull();
    }


    @Test
    public void postUser_whenUserIsValid_passwordIsHashedInDatabase() {
        Usuario usuario = createValidUser();
        postSignup(usuario, Object.class);

        List<Usuario> usuarios = usuarioRepository.findAll();
        Usuario usuarioDB = usuarios.get(0);

        assertThat(usuarioDB.getPassword()).isNotEqualTo(usuario.getPassword());
    }

    @Test
    public void postUser_whenUserHasNullUsername_receiveBadRequest() {
        Usuario usuario = createValidUser();
        usuario.setUsername(null);
        ResponseEntity<Object> response = postSignup(usuario, Object.class);
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
    }

    @Test
    public void postUser_whenUserHasNullDisplayName_receiveBadRequest() {
        Usuario usuario = createValidUser();
        usuario.setNome(null);
        ResponseEntity<Object> response = postSignup(usuario, Object.class);
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
    }

    @Test
    public void postUser_whenUserHasNullPassword_receiveBadRequest() {
        Usuario usuario = createValidUser();
        usuario.setPassword(null);
        ResponseEntity<Object> response = postSignup(usuario, Object.class);
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
    }

    @Test
    public void postUser_whenUserHasUsernameWithLessThenRequired_receiveBadRequest() {
        Usuario usuario = createValidUser();
        usuario.setUsername("123");
        ResponseEntity<Object> response = postSignup(usuario, Object.class);
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
    }

    @Test
    public void postUser_whenUserHasDisplayNameWithLessThenRequired_receiveBadRequest() {
        Usuario usuario = createValidUser();
        usuario.setNome("123");
        ResponseEntity<Object> response = postSignup(usuario, Object.class);
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
    }

    @Test
    public void postUser_whenUserHasPasswordWithLessThenRequired_receiveBadRequest() {
        Usuario usuario = createValidUser();
        usuario.setPassword("12345");
        ResponseEntity<Object> response = postSignup(usuario, Object.class);
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
    }

    @Test
    public void postUser_whenUserHasUsernameExceedsTheLengthLimit_receiveBadRequest() {
        Usuario usuario = createValidUser();
        String string256Chars = IntStream.rangeClosed(1, 256).mapToObj(x -> "a")
                .collect(Collectors.joining());
        usuario.setUsername(string256Chars);
        ResponseEntity<Object> response = postSignup(usuario, Object.class);
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
    }

    @Test
    public void postUser_whenUserHasPasswordAllLowecase_receiveBadRequest() {
        Usuario usuario = createValidUser();
        usuario.setPassword("abcdef");
        ResponseEntity<Object> response = postSignup(usuario, Object.class);
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
    }

    @Test
    public void postUser_whenUserHasPasswordAllUpercase_receiveBadRequest() {
        Usuario usuario = createValidUser();
        usuario.setPassword("ABCDEF");
        ResponseEntity<Object> response = postSignup(usuario, Object.class);
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
    }

    @Test
    public void postUser_whenUserHasPasswordAllNumber_receiveBadRequest() {
        Usuario usuario = createValidUser();
        usuario.setPassword("123456");
        ResponseEntity<Object> response = postSignup(usuario, Object.class);
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
    }

    @Test
    public void postUser_whenUserIsInvalid_receiveApiError() {
        ResponseEntity<ApiError> response = postSignup(new Usuario(), ApiError.class);
        assertThat(response.getBody().getUrl()).isEqualTo(URL_USERS);
    }

    @Test
    public void postUser_whenUserIsInvalid_receiveApiErrorWithValidationErrors() {
        ResponseEntity<ApiError> response = postSignup(new Usuario(), ApiError.class);
        assertThat(response.getBody().getValidationErrors().size()).isEqualTo(3);
    }

    @Test
    public void postUser_whenAnotherUserHasSameUsername_receiveBadRequest() {
        usuarioRepository.save(createValidUser());
        ResponseEntity<Object> response = postSignup(createValidUser(), Object.class);
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
    }

    @Test
    public void postUser_whenAnotherUserHasSameUsername_receiveMessageOfDuplicatedUsername() {
        usuarioRepository.save(createValidUser());
        ResponseEntity<ApiError> response = postSignup(createValidUser(), ApiError.class);
        Map<String, String> validationErrors = response.getBody().getValidationErrors();
        assertThat(validationErrors.get("username")).isEqualTo("Esse usuário já existe");
    }



    public <T> ResponseEntity<T> postSignup(Object request, Class<T> responseType) {
        return testRestTemplate.postForEntity(URL_USERS, request, responseType);
    }

    private Usuario createValidUser() {
        Usuario usuario = new Usuario();
        usuario.setUsername("test-user");
        usuario.setNome("test-display");
        //user.setEmail("teste@123");
        usuario.setPassword("P4ssword");
        return usuario;
    }
}

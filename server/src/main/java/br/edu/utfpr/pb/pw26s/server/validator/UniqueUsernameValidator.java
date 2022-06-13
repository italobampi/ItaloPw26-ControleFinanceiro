package br.edu.utfpr.pb.pw26s.server.validator;

import br.edu.utfpr.pb.pw26s.server.annotation.UniqueUsername;
import br.edu.utfpr.pb.pw26s.server.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class UniqueUsernameValidator
        implements ConstraintValidator<UniqueUsername, String> {

    @Autowired
    UsuarioRepository usuarioRepository;

    @Override
    public boolean isValid(String username,
                           ConstraintValidatorContext constraintValidatorContext) {
        if (usuarioRepository.findByUsername(username) == null) {
            return true;
        }
        return false;
    }
}

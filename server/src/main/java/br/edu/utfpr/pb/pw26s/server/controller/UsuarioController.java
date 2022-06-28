package br.edu.utfpr.pb.pw26s.server.controller;

import br.edu.utfpr.pb.pw26s.server.model.Usuario;
import br.edu.utfpr.pb.pw26s.server.service.UsuarioService;
import br.edu.utfpr.pb.pw26s.server.shared.GenericResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("users")
public class UsuarioController {

    @Autowired
    UsuarioService usuarioService;

    @PostMapping
    GenericResponse createUser(@Valid @RequestBody Usuario usuario) {
        usuarioService.save(usuario);
        return new GenericResponse("Registro salvo.");
    }


}

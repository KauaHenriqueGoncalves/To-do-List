package com.example.demo.controller;

import com.example.demo.dto.login.LoginRequest;
import com.example.demo.dto.login.LoginResponse;
import com.example.demo.dto.record.UserRecordDto;
import com.example.demo.entities.User;
import com.example.demo.service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;

@RestController
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class LoginController {

    @Autowired
    private LoginService loginService;

    @PostMapping("/login")
    public ResponseEntity<LoginRequest> login(@RequestBody LoginResponse loginResponse) {
        LoginRequest loginRequest = loginService.login(loginResponse);
        return ResponseEntity.ok().body(loginRequest);
    }

    @PostMapping("/signup")
    public ResponseEntity<Void> signup(@RequestBody UserRecordDto userRecordDto) {
        User user = new User();
        user.setName(userRecordDto.name());
        user.setPassword(userRecordDto.password());

        user = loginService.signup(user);

        URI uri = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(user.getId())
                .toUri();

        return ResponseEntity.created(uri).build();
    }

}

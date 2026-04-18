package com.backend.WheaterWise.controller;

import com.backend.WheaterWise.dto.requests.LoginRequest;
import com.backend.WheaterWise.dto.requests.RegisterRequest;
import com.backend.WheaterWise.dto.responses.LoginResponse;
import com.backend.WheaterWise.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegisterRequest registerRequest) {
        String register = authService.register(registerRequest);
        return new ResponseEntity<>(register, HttpStatus.OK);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest loginRequest) {
        LoginResponse login = authService.login(loginRequest);
        return new ResponseEntity<>(login, HttpStatus.OK);
    }
}

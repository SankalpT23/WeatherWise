package com.backend.WheaterWise.service;

import com.backend.WheaterWise.dto.requests.LoginRequest;
import com.backend.WheaterWise.dto.requests.RegisterRequest;
import com.backend.WheaterWise.dto.responses.LoginResponse;
import com.backend.WheaterWise.model.User;
import com.backend.WheaterWise.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@Transactional
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtService jwtService;

    public String register(RegisterRequest registerRequest) {
        User user = userRepository.findByEmail(registerRequest.getEmail());
        if (user != null) {
            throw new RuntimeException("User already exists");
        }

        User newUser = new User();
        newUser.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
        newUser.setEmail(registerRequest.getEmail());
        newUser.setCreatedAt(LocalDateTime.now());
        newUser.setUsername(registerRequest.getUsername());

        userRepository.save(newUser);

        return "User registered successfully";
    }

    public LoginResponse login(LoginRequest loginRequest) {
        User user = userRepository.findByEmail(loginRequest.getEmail());
        if (user == null) {
            throw new RuntimeException("Invalid email or password");
        }

        if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        String token = jwtService.generateToken(loginRequest.getEmail());
        return new LoginResponse(token);
    }
}

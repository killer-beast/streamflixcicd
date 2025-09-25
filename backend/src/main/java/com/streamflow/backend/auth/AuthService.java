package com.streamflow.backend.auth;

import com.streamflow.backend.auth.dto.AuthDtos;
import com.streamflow.backend.user.User;
import com.streamflow.backend.user.UserService;
import com.streamflow.backend.security.JwtService;
import org.springframework.security.authentication.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthService {

    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authManager;

    public AuthService(UserService userService, PasswordEncoder passwordEncoder, JwtService jwtService, AuthenticationManager authManager) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.authManager = authManager;
    }

    @Transactional
    public AuthDtos.AuthResponse register(AuthDtos.RegisterRequest req) {
        if (userService.existsByEmail(req.email())) {
            throw new IllegalArgumentException("Email already registered");
        }
        User user = User.builder()
                .email(req.email())
                .passwordHash(passwordEncoder.encode(req.password()))
                .role("USER")
                .build();
        userService.save(user);
        String token = jwtService.generateToken(user.getEmail());
        return new AuthDtos.AuthResponse(token);
    }

    public AuthDtos.AuthResponse login(AuthDtos.LoginRequest req) {
        // Authenticate with AuthenticationManager -> will call UserDetailsService + passwordEncoder
        authManager.authenticate(
                new UsernamePasswordAuthenticationToken(req.email(), req.password())
        );

        // If authentication passes, generate token
        String token = jwtService.generateToken(req.email());
        return new AuthDtos.AuthResponse(token);
    }
}

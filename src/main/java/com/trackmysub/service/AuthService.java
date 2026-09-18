package com.trackmysub.service;

import com.trackmysub.dto.AuthResponse;
import com.trackmysub.dto.LoginRequest;
import com.trackmysub.dto.RegisterRequest;
import com.trackmysub.dto.TokenRefreshRequest;
import com.trackmysub.entity.User;
import com.trackmysub.exception.BadRequestException;
import com.trackmysub.exception.DuplicateResourceException;
import com.trackmysub.repository.UserRepository;
import com.trackmysub.util.JwtUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

/**
 * Service for handling authentication logic.
 */
@Slf4j
@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final AuthenticationManager authenticationManager;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder, 
                       JwtUtil jwtUtil, AuthenticationManager authenticationManager) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
        this.authenticationManager = authenticationManager;
    }

    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.email())) {
            throw new DuplicateResourceException("User with email already exists");
        }

        User user = new User();
        user.setEmail(request.email());
        user.setPasswordHash(passwordEncoder.encode(request.password()));
        user.setName(request.name());
        
        userRepository.save(user);

        String accessToken = jwtUtil.generateAccessToken(user.getEmail());
        String refreshToken = jwtUtil.generateRefreshToken(user.getEmail());

        log.info("Registered new user with email {}", request.email());
        return new AuthResponse(accessToken, refreshToken);
    }

    public AuthResponse login(LoginRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.email(), request.password())
        );

        String accessToken = jwtUtil.generateAccessToken(request.email());
        String refreshToken = jwtUtil.generateRefreshToken(request.email());

        log.info("User {} logged in successfully", request.email());
        return new AuthResponse(accessToken, refreshToken);
    }

    public AuthResponse refreshToken(TokenRefreshRequest request) {
        String token = request.refreshToken();

        if (!jwtUtil.validateToken(token) || !jwtUtil.isRefreshToken(token)) {
            throw new BadRequestException("Invalid refresh token");
        }

        String email = jwtUtil.extractEmail(token);
        String accessToken = jwtUtil.generateAccessToken(email);
        String refreshToken = jwtUtil.generateRefreshToken(email);

        log.info("Tokens refreshed for user {}", email);
        return new AuthResponse(accessToken, refreshToken);
    }
}

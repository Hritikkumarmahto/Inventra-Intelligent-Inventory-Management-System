package com.example.demo.controller;


import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.example.demo.config.JwtService;
import com.example.demo.dto.AuthRequest;
import com.example.demo.entity.User;
import com.example.demo.repository.UserRepository;

@RestController
@RequestMapping("/auth")
@CrossOrigin
public class AuthController {

    private final UserRepository userRepo;
    private final PasswordEncoder encoder;
    private final JwtService jwtService;

    public AuthController(UserRepository userRepo,
                          PasswordEncoder encoder,
                          JwtService jwtService) {
        this.userRepo = userRepo;
        this.encoder = encoder;
        this.jwtService = jwtService;
    }

    @PostMapping("/register")
    public String register(@RequestBody AuthRequest req) {

        if (userRepo.findByUsername(req.username()).isPresent()) {
            return "Username already exists";
        }

        User user = new User();
        user.setUsername(req.username());
        user.setPassword(encoder.encode(req.password()));
        user.setRole(req.role());

        userRepo.save(user);

        return "Registered successfully";
    }

    @PostMapping("/login")
    public String login(@RequestBody AuthRequest req) {

        User user = userRepo.findByUsername(req.username())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!encoder.matches(req.password(), user.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        return jwtService.generateToken(
                user.getUsername(),
                user.getRole()
        );
    }
}


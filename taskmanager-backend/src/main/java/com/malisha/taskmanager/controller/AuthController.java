package com.malisha.taskmanager.controller;

import com.malisha.taskmanager.utill.Mapping;
import com.malisha.taskmanager.dto.LoginRequest;
import com.malisha.taskmanager.dto.UserDTO;
import com.malisha.taskmanager.entity.User;
import com.malisha.taskmanager.repository.UserRepository;
import com.malisha.taskmanager.utill.JwtUtil;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin
public class AuthController {

    private final JwtUtil jwtUtil;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    private final Mapping mapping;


    public AuthController(JwtUtil jwtUtil,
                          UserRepository userRepository,
                          Mapping mapping,
                          PasswordEncoder passwordEncoder) {
        this.jwtUtil = jwtUtil;
        this.userRepository = userRepository;
        this.mapping = mapping;
        this.passwordEncoder = passwordEncoder;

    }

    @PostMapping("/login")
    public String login(@RequestBody LoginRequest request) {

        User user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        return jwtUtil.generateToken(
                user.getUsername(),
                user.getRole().name()
        );
    }

    @PostMapping("/register")
    public UserDTO register(@RequestBody User user) {

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        User savedUser = userRepository.save(user);

        return mapping.convertToUserDTO(savedUser);
    }
}
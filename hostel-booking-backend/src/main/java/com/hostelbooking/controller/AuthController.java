package com.hostelbooking.controller;

import com.hostelbooking.dto.ApiResponse;
import com.hostelbooking.dto.AuthRequest;
import com.hostelbooking.model.Manager;
import com.hostelbooking.security.JwtUtil;
import com.hostelbooking.service.ManagerService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class AuthController {

    private final ManagerService managerService;
    private final JwtUtil jwtUtil;

    public AuthController(ManagerService managerService, JwtUtil jwtUtil) {
        this.managerService = managerService;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/auth/login")
    public ResponseEntity<Map<String, Object>> login(@Valid @RequestBody AuthRequest request) {
        Manager manager = managerService.login(request);
        String token = jwtUtil.generateToken(manager.getUsername(), manager.getRole());

        Map<String, Object> response = new HashMap<>();
        response.put("token", token);
        response.put("user", Map.of(
                "username", manager.getUsername(),
                "name", manager.getFullName(),
                "role", manager.getRole(),
                "email", manager.getUsername() + "@example.com"
        ));

        return ResponseEntity.ok(response);
    }

    @PostMapping("/auth/register")
    public ResponseEntity<Map<String, Object>> register(@Valid @RequestBody AuthRequest request) {
        String fullName = request.getName() != null && !request.getName().isBlank()
                ? request.getName()
                : request.getUsername();

        Manager manager = managerService.registerManager(
                request.getUsername(),
                request.getPassword(),
                fullName,
                request.getRole()
        );

        String token = jwtUtil.generateToken(manager.getUsername(), manager.getRole());

        Map<String, Object> response = new HashMap<>();
        response.put("token", token);
        response.put("user", Map.of(
                "username", manager.getUsername(),
                "name", manager.getFullName(),
                "role", manager.getRole(),
                "email", request.getEmail() != null && !request.getEmail().isBlank()
                        ? request.getEmail()
                        : manager.getUsername() + "@example.com"
        ));

        return ResponseEntity.ok(response);
    }

    @GetMapping("/auth/me")
    public ResponseEntity<?> me(@RequestHeader(value = "Authorization", required = false) String auth) {
        if (auth == null || !auth.startsWith("Bearer ")) {
            return ResponseEntity.status(401)
                    .body(Map.of("message", "JWT token is required"));
        }

        try {
            String token = auth.substring(7).trim();

            if (!jwtUtil.validateToken(token)) {
                return ResponseEntity.status(401)
                        .body(Map.of("message", "Invalid or expired JWT"));
            }

            String username = jwtUtil.getUsername(token);
            Manager manager = managerService.findByUsername(username);

            return ResponseEntity.ok(Map.of(
                    "username", manager.getUsername(),
                    "name", manager.getFullName(),
                    "role", manager.getRole(),
                    "email", manager.getUsername() + "@example.com"
            ));

        } catch (Exception e) {
            return ResponseEntity.status(401)
                    .body(Map.of("message", "Invalid or expired JWT"));
        }
    }
}

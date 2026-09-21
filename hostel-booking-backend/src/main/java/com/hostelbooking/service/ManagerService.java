package com.hostelbooking.service;

import com.hostelbooking.dto.AuthRequest;
import com.hostelbooking.exception.ApiException;
import com.hostelbooking.model.Manager;
import com.hostelbooking.repository.ManagerRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class ManagerService {

    private final ManagerRepository managerRepository;
    private final PasswordEncoder passwordEncoder;

    public ManagerService(ManagerRepository managerRepository, PasswordEncoder passwordEncoder) {
        this.managerRepository = managerRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public Manager registerManager(String username, String password, String fullName) {
        return registerManager(username, password, fullName, "HOSTEL_MANAGER");
    }

    public Manager registerManager(String username, String password, String fullName, String role) {
        if (username == null || username.isBlank()) {
            throw new ApiException("Username is required");
        }
        if (password == null || password.length() < 6) {
            throw new ApiException("Password must be at least 6 characters");
        }

        String normalizedUsername = username.trim().toLowerCase();
        managerRepository.findByUsername(normalizedUsername)
            .ifPresent(existing -> { throw new ApiException("Manager already exists"); });

        String normalizedRole = (role == null || role.isBlank()) ? "HOSTEL_MANAGER" : role.trim().toUpperCase();
        if (!"HOSTEL_MANAGER".equals(normalizedRole) && !"CUSTOMER".equals(normalizedRole) && !"ADMIN".equals(normalizedRole)) {
            normalizedRole = "HOSTEL_MANAGER";
        }

        Manager manager = new Manager();
        manager.setUsername(normalizedUsername);
        manager.setPassword(passwordEncoder.encode(password));
        manager.setFullName(fullName == null || fullName.isBlank() ? normalizedUsername : fullName.trim());
        manager.setRole(normalizedRole);

        return managerRepository.save(manager);
    }

    public Manager login(AuthRequest request) {
        String normalizedUsername = request.getUsername().trim().toLowerCase();
        Manager manager = managerRepository.findByUsername(normalizedUsername)
            .orElseThrow(() -> new ApiException("Invalid username or password"));

        if (!passwordEncoder.matches(request.getPassword(), manager.getPassword())) {
            throw new ApiException("Invalid username or password");
        }

        return manager;
    }

    public Manager findByUsername(String username) {
        if (username == null || username.isBlank()) {
            throw new ApiException("Username is required");
        }

        return managerRepository.findByUsername(username.trim().toLowerCase())
            .orElseThrow(() -> new ApiException("User not found"));
    }
}

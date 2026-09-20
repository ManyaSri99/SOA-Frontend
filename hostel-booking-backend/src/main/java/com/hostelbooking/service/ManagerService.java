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
        if (username == null || username.isBlank()) {
            throw new ApiException("Username is required");
        }
        if (password == null || password.length() < 6) {
            throw new ApiException("Password must be at least 6 characters");
        }

        managerRepository.findByUsername(username.trim())
            .ifPresent(existing -> { throw new ApiException("Manager already exists"); });

        Manager manager = new Manager();
        manager.setUsername(username.trim());
        manager.setPassword(passwordEncoder.encode(password));
        manager.setFullName(fullName == null ? username.trim() : fullName.trim());
        manager.setRole("HOSTEL_MANAGER");

        return managerRepository.save(manager);
    }

    public Manager login(AuthRequest request) {
        Manager manager = managerRepository.findByUsername(request.getUsername().trim())
            .orElseThrow(() -> new ApiException("Invalid username or password"));

        if (!passwordEncoder.matches(request.getPassword(), manager.getPassword())) {
            throw new ApiException("Invalid username or password");
        }

        return manager;
    }
}

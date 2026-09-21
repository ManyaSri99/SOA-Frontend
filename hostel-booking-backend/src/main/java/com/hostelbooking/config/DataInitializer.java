package com.hostelbooking.config;

import com.hostelbooking.model.Area;
import com.hostelbooking.model.City;
import com.hostelbooking.model.Manager;
import com.hostelbooking.model.RoomType;
import com.hostelbooking.repository.AreaRepository;
import com.hostelbooking.repository.CityRepository;
import com.hostelbooking.repository.ManagerRepository;
import com.hostelbooking.repository.RoomTypeRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class DataInitializer {

    @Bean
    public CommandLineRunner seedDefaultUsers(ManagerRepository managerRepository,
                                              CityRepository cityRepository,
                                              AreaRepository areaRepository,
                                              RoomTypeRepository roomTypeRepository,
                                              PasswordEncoder passwordEncoder) {
        return args -> {
            seedManager(managerRepository, passwordEncoder, "manager", "manager123", "Manager");
            seedManager(managerRepository, passwordEncoder, "admin", "admin123", "Admin");
            seedManager(managerRepository, passwordEncoder, "kiran", "kiran123", "Kiran");
            seedManager(managerRepository, passwordEncoder, "mochi", "mochi", "Mochi");
            seedManager(managerRepository, passwordEncoder, "manya", "manya123", "Manya");

            City city = cityRepository.findByName("Hyderabad").orElseGet(() -> cityRepository.save(new City(null, "Hyderabad")));
            areaRepository.findByCityId(city.getId()).stream()
                .filter(area -> "Kanupp".equalsIgnoreCase(area.getName()))
                .findFirst()
                .orElseGet(() -> areaRepository.save(new Area(null, "Kanupp", city)));

            seedRoomType(roomTypeRepository, "DELUXE", "Deluxe room");
            seedRoomType(roomTypeRepository, "STANDARD", "Standard room");
            seedRoomType(roomTypeRepository, "SUITE", "Suite room");
        };
    }

    private void seedManager(ManagerRepository managerRepository, PasswordEncoder passwordEncoder,
                             String username, String password, String fullName) {
        if (managerRepository.findByUsername(username).isEmpty()) {
            Manager manager = new Manager();
            manager.setUsername(username);
            manager.setPassword(passwordEncoder.encode(password));
            manager.setFullName(fullName);
            manager.setRole(username.equals("admin") ? "ADMIN" : username.equals("kiran") ? "CUSTOMER" : "HOSTEL_MANAGER");
            managerRepository.save(manager);
        }
    }

    private void seedRoomType(RoomTypeRepository roomTypeRepository, String name, String description) {
        roomTypeRepository.findByName(name).orElseGet(() -> roomTypeRepository.save(new RoomType(null, name, description)));
    }
}

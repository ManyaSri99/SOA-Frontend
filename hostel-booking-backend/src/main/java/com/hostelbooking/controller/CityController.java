package com.hostelbooking.controller;

import com.hostelbooking.dto.CityRequest;
import com.hostelbooking.model.City;
import com.hostelbooking.service.CityService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class CityController {

    private final CityService cityService;

    public CityController(CityService cityService) {
        this.cityService = cityService;
    }

    @GetMapping("/cities")
    public List<City> getCities() {
        return cityService.getAllCities();
    }

    @PostMapping("/cities")
    public ResponseEntity<City> createCity(@RequestBody CityRequest request) {
        return ResponseEntity.ok(cityService.createCity(request.getName()));
    }
}

package com.hostelbooking.service;

import com.hostelbooking.exception.ApiException;
import com.hostelbooking.model.City;
import com.hostelbooking.repository.CityRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CityService {

    private final CityRepository cityRepository;

    public CityService(CityRepository cityRepository) {
        this.cityRepository = cityRepository;
    }

    public List<City> getAllCities() {
        return cityRepository.findAll();
    }

    public City getCityById(Long cityId) {
        return cityRepository.findById(cityId)
            .orElseThrow(() -> new ApiException("City not found"));
    }

    public City createCity(String name) {
        if (name == null || name.isBlank()) {
            throw new ApiException("City name is required");
        }
        return cityRepository.findByName(name)
            .orElseGet(() -> cityRepository.save(new City(null, name.trim())));
    }
}

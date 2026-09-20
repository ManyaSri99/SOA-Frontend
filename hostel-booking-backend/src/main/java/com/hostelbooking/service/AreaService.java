package com.hostelbooking.service;

import com.hostelbooking.exception.ApiException;
import com.hostelbooking.model.Area;
import com.hostelbooking.model.City;
import com.hostelbooking.repository.AreaRepository;
import com.hostelbooking.repository.CityRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AreaService {

    private final AreaRepository areaRepository;
    private final CityRepository cityRepository;

    public AreaService(AreaRepository areaRepository, CityRepository cityRepository) {
        this.areaRepository = areaRepository;
        this.cityRepository = cityRepository;
    }

    public List<Area> getAllAreas() {
        return areaRepository.findAll();
    }

    public List<Area> getAreasByCityId(Long cityId) {
        return areaRepository.findByCityId(cityId);
    }

    public Area createArea(Long cityId, String name) {
        if (name == null || name.isBlank()) {
            throw new ApiException("Area name is required");
        }
        City city = cityRepository.findById(cityId)
            .orElseThrow(() -> new ApiException("City not found"));
        return areaRepository.save(new Area(null, name.trim(), city));
    }
}

package com.hostelbooking.service;

import com.hostelbooking.exception.ApiException;
import com.hostelbooking.model.Area;
import com.hostelbooking.model.City;
import com.hostelbooking.model.Hostel;
import com.hostelbooking.repository.AreaRepository;
import com.hostelbooking.repository.CityRepository;
import com.hostelbooking.repository.HostelRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HostelService {

    private final HostelRepository hostelRepository;
    private final CityRepository cityRepository;
    private final AreaRepository areaRepository;

    public HostelService(HostelRepository hostelRepository, CityRepository cityRepository, AreaRepository areaRepository) {
        this.hostelRepository = hostelRepository;
        this.cityRepository = cityRepository;
        this.areaRepository = areaRepository;
    }

    public List<Hostel> getAllHostels() {
        return hostelRepository.findAll();
    }

    public Hostel getHostelById(Long hostelId) {
        return hostelRepository.findById(hostelId)
            .orElseThrow(() -> new ApiException("Hostel not found"));
    }

    public List<Hostel> getHostelsByCityAndArea(Long cityId, Long areaId) {
        if (cityId != null && areaId != null) {
            return hostelRepository.findByCityIdAndAreaId(cityId, areaId);
        }
        if (cityId != null) {
            return hostelRepository.findByCityId(cityId);
        }
        if (areaId != null) {
            return hostelRepository.findByAreaId(areaId);
        }
        return hostelRepository.findAll();
    }

    public Hostel createHostel(Long cityId, Long areaId, String name, String address, String contactNumber, String facilities) {
        if (name == null || name.isBlank()) {
            throw new ApiException("Hostel name is required");
        }
        City city = cityRepository.findById(cityId)
            .orElseThrow(() -> new ApiException("City not found"));
        Area area = areaRepository.findById(areaId)
            .orElseThrow(() -> new ApiException("Area not found"));

        Hostel hostel = new Hostel();
        hostel.setName(name.trim());
        hostel.setCity(city);
        hostel.setArea(area);
        hostel.setAddress(address == null ? "" : address.trim());
        hostel.setContactNumber(contactNumber == null ? "" : contactNumber.trim());
        hostel.setFacilities(facilities == null ? "" : facilities.trim());
        hostel.setStatus("ACTIVE");
        return hostelRepository.save(hostel);
    }

    public Hostel createHostel(Hostel hostel) {
        if (hostel == null || hostel.getName() == null || hostel.getName().isBlank()) {
            throw new ApiException("Hostel name is required");
        }
        if (hostel.getCity() == null || hostel.getCity().getId() == null) {
            throw new ApiException("City is required");
        }
        if (hostel.getArea() == null || hostel.getArea().getId() == null) {
            throw new ApiException("Area is required");
        }

        City city = cityRepository.findById(hostel.getCity().getId())
            .orElseThrow(() -> new ApiException("City not found"));
        Area area = areaRepository.findById(hostel.getArea().getId())
            .orElseThrow(() -> new ApiException("Area not found"));

        hostel.setCity(city);
        hostel.setArea(area);
        hostel.setAddress(hostel.getAddress() == null ? "" : hostel.getAddress().trim());
        hostel.setContactNumber(hostel.getContactNumber() == null ? "" : hostel.getContactNumber().trim());
        hostel.setFacilities(hostel.getFacilities() == null ? "" : hostel.getFacilities().trim());
        hostel.setStatus(hostel.getStatus() == null || hostel.getStatus().isBlank() ? "ACTIVE" : hostel.getStatus());
        return hostelRepository.save(hostel);
    }
}

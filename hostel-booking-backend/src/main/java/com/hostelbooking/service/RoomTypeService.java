package com.hostelbooking.service;

import com.hostelbooking.exception.ApiException;
import com.hostelbooking.model.RoomType;
import com.hostelbooking.repository.RoomTypeRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoomTypeService {

    private final RoomTypeRepository roomTypeRepository;

    public RoomTypeService(RoomTypeRepository roomTypeRepository) {
        this.roomTypeRepository = roomTypeRepository;
    }

    public List<RoomType> getAllRoomTypes() {
        return roomTypeRepository.findAll();
    }

    public RoomType createRoomType(String name, String description) {
        if (name == null || name.isBlank()) {
            throw new ApiException("Room type name is required");
        }
        return roomTypeRepository.findByName(name.trim())
            .orElseGet(() -> roomTypeRepository.save(new RoomType(null, name.trim(), description == null ? "" : description.trim())));
    }
}

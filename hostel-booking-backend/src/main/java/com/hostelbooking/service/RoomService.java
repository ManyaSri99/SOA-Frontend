package com.hostelbooking.service;

import com.hostelbooking.exception.ApiException;
import com.hostelbooking.model.Hostel;
import com.hostelbooking.model.Room;
import com.hostelbooking.model.RoomType;
import com.hostelbooking.repository.HostelRepository;
import com.hostelbooking.repository.RoomRepository;
import com.hostelbooking.repository.RoomTypeRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoomService {

    private final RoomRepository roomRepository;
    private final HostelRepository hostelRepository;
    private final RoomTypeRepository roomTypeRepository;

    public RoomService(RoomRepository roomRepository, HostelRepository hostelRepository, RoomTypeRepository roomTypeRepository) {
        this.roomRepository = roomRepository;
        this.hostelRepository = hostelRepository;
        this.roomTypeRepository = roomTypeRepository;
    }

    public List<Room> getAllRooms() {
        return roomRepository.findAll();
    }

    public List<Room> getRoomsByHostel(Long hostelId) {
        return roomRepository.findByHostelId(hostelId);
    }

    public Room getRoomById(Long roomId) {
        return roomRepository.findById(roomId)
            .orElseThrow(() -> new ApiException("Room not found"));
    }

    public Room createRoom(Long hostelId, Long roomTypeId, String roomNumber, String status,
                          Integer availableRooms, Double pricePerHour, Double pricePerDay, String facilities) {
        Hostel hostel = hostelRepository.findById(hostelId)
            .orElseThrow(() -> new ApiException("Hostel not found"));
        RoomType roomType = roomTypeRepository.findById(roomTypeId)
            .orElseThrow(() -> new ApiException("Room type not found"));

        if (availableRooms == null || availableRooms < 1) {
            throw new ApiException("Available rooms must be at least 1");
        }

        Room room = new Room();
        room.setHostel(hostel);
        room.setRoomType(roomType);
        room.setRoomNumber(roomNumber == null ? "" : roomNumber.trim());
        room.setStatus(status == null || status.isBlank() ? "AVAILABLE" : status.toUpperCase());
        room.setAvailableRooms(availableRooms);
        room.setPricePerHour(pricePerHour == null ? 0.0 : pricePerHour);
        room.setPricePerDay(pricePerDay == null ? 0.0 : pricePerDay);
        room.setFacilities(facilities == null ? "" : facilities.trim());
        return roomRepository.save(room);
    }

    public Room createRoom(Room room) {
        if (room == null) {
            throw new ApiException("Room data is required");
        }
        if (room.getHostel() == null || room.getHostel().getId() == null) {
            throw new ApiException("Hostel is required");
        }
        if (room.getRoomType() == null || room.getRoomType().getId() == null) {
            throw new ApiException("Room type is required");
        }

        Hostel hostel = hostelRepository.findById(room.getHostel().getId())
            .orElseThrow(() -> new ApiException("Hostel not found"));
        RoomType roomType = roomTypeRepository.findById(room.getRoomType().getId())
            .orElseThrow(() -> new ApiException("Room type not found"));

        room.setHostel(hostel);
        room.setRoomType(roomType);
        room.setStatus(room.getStatus() == null || room.getStatus().isBlank() ? "AVAILABLE" : room.getStatus().toUpperCase());
        room.setAvailableRooms(room.getAvailableRooms() == null || room.getAvailableRooms() < 1 ? 1 : room.getAvailableRooms());
        room.setPricePerHour(room.getPricePerHour() == null ? 0.0 : room.getPricePerHour());
        room.setPricePerDay(room.getPricePerDay() == null ? 0.0 : room.getPricePerDay());
        room.setFacilities(room.getFacilities() == null ? "" : room.getFacilities());
        return roomRepository.save(room);
    }

    public List<Room> getAvailableRooms() {
        return roomRepository.findByStatus("AVAILABLE");
    }
}

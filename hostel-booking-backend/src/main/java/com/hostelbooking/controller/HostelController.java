package com.hostelbooking.controller;

import com.hostelbooking.model.Hostel;
import com.hostelbooking.service.HostelService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class HostelController {

    private final HostelService hostelService;

    public HostelController(HostelService hostelService) {
        this.hostelService = hostelService;
    }

    @GetMapping("/hostels")
    public List<Hostel> getAllHostels() {
        return hostelService.getAllHostels();
    }

    @GetMapping("/hostels/{id}")
    public Hostel getHostelById(@PathVariable Long id) {
        return hostelService.getHostelById(id);
    }

    @PostMapping("/hostels")
    public ResponseEntity<Hostel> createHostel(@RequestBody Hostel hostel) {
        return ResponseEntity.ok(hostelService.createHostel(hostel));
    }
}

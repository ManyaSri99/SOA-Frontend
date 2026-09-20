package com.hostelbooking.controller;

import com.hostelbooking.model.Area;
import com.hostelbooking.service.AreaService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class AreaController {

    private final AreaService areaService;

    public AreaController(AreaService areaService) {
        this.areaService = areaService;
    }

    @GetMapping("/areas")
    public List<Area> getAreas() {
        return areaService.getAllAreas();
    }

    @PostMapping("/areas")
    public ResponseEntity<Area> createArea(@RequestParam Long cityId, @RequestParam String name) {
        return ResponseEntity.ok(areaService.createArea(cityId, name));
    }
}

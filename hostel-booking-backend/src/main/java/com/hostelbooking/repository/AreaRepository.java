package com.hostelbooking.repository;

import com.hostelbooking.model.Area;
import com.hostelbooking.model.City;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AreaRepository extends JpaRepository<Area, Long> {
    List<Area> findByCity(City city);
    List<Area> findByCityId(Long cityId);
}

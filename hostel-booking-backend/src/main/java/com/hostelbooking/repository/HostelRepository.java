package com.hostelbooking.repository;

import com.hostelbooking.model.Hostel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HostelRepository extends JpaRepository<Hostel, Long> {
    List<Hostel> findByCityId(Long cityId);
    List<Hostel> findByAreaId(Long areaId);
    List<Hostel> findByCityIdAndAreaId(Long cityId, Long areaId);
}

package com.hostelbooking.repository;

import com.hostelbooking.model.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long> {
    List<Notification> findByRecipientType(String recipientType);
    List<Notification> findByStatus(String status);
}

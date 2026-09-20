package com.hostelbooking.service;

import com.hostelbooking.exception.ApiException;
import com.hostelbooking.model.Notification;
import com.hostelbooking.repository.NotificationRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class NotificationService {

    private final NotificationRepository notificationRepository;

    public NotificationService(NotificationRepository notificationRepository) {
        this.notificationRepository = notificationRepository;
    }

    public List<Notification> getAllNotifications() {
        return notificationRepository.findAll();
    }

    public Notification markAsRead(Long notificationId) {
        Notification notification = notificationRepository.findById(notificationId)
            .orElseThrow(() -> new ApiException("Notification not found"));
        notification.setStatus("READ");
        return notificationRepository.save(notification);
    }

    public Notification createNotification(String title, String message, String recipientType, String bookingId) {
        Notification notification = new Notification();
        notification.setTitle(title);
        notification.setMessage(message);
        notification.setRecipientType(recipientType);
        notification.setStatus("UNREAD");
        notification.setCreatedAt(LocalDateTime.now());
        notification.setBookingId(bookingId);
        return notificationRepository.save(notification);
    }
}

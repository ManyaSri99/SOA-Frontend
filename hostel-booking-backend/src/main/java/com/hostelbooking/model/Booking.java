package com.hostelbooking.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "bookings")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String bookingId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "customer_id", nullable = false)
    private Customer customer;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "room_id", nullable = false)
    private Room room;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "hostel_id", nullable = false)
    private Hostel hostel;

    @Column(nullable = false)
    private LocalDate checkInDate;

    @Column(nullable = false)
    private LocalTime checkInTime;

    @Column(nullable = false)
    private LocalDate checkOutDate;

    @Column(nullable = false)
    private LocalTime checkOutTime;

    @Column(nullable = false)
    private Integer numberOfHours;

    @Column(nullable = false)
    private Double pricePerHour;

    @Column(nullable = false)
    private Double totalAmount;

    @Column(nullable = false)
    private String paymentStatus = "PENDING";

    @Column(nullable = false)
    private String bookingStatus = "PENDING";

    @Column(nullable = false)
    private String paymentMethod = "UPI";

    @Column(nullable = false)
    private String city;

    @Column(nullable = false)
    private String area;
}

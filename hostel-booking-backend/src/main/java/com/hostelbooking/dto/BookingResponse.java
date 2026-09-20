package com.hostelbooking.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookingResponse {
    private String bookingId;
    private String customerName;
    private String hostelName;
    private String city;
    private String area;
    private String roomType;
    private String roomNumber;
    private LocalDate checkInDate;
    private LocalTime checkInTime;
    private LocalDate checkOutDate;
    private LocalTime checkOutTime;
    private Integer numberOfHours;
    private Double pricePerHour;
    private Double totalRoomCost;
    private String paymentStatus;
    private String bookingStatus;
}

package com.hostelbooking.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CustomerBookingRequest {

    @NotBlank(message = "Full name is required")
    private String fullName;

    @NotBlank(message = "Mobile number is required")
    private String mobileNumber;

    @NotBlank(message = "Email is required")
    @Email(message = "Email should be valid")
    private String email;

    @NotNull(message = "Age is required")
    @Min(value = 1, message = "Age must be positive")
    private Integer age;

    @NotBlank(message = "Gender is required")
    private String gender;

    @NotBlank(message = "ID proof type is required")
    private String idProofType;

    @NotBlank(message = "ID proof number is required")
    private String idProofNumber;

    @NotNull(message = "Number of guests is required")
    @Min(value = 1, message = "Guests count must be at least 1")
    private Integer numberOfGuests;

    @NotNull(message = "Check-in date is required")
    private LocalDate checkInDate;

    @NotNull(message = "Check-in time is required")
    private LocalTime checkInTime;

    @NotNull(message = "Check-out date is required")
    private LocalDate checkOutDate;

    @NotNull(message = "Check-out time is required")
    private LocalTime checkOutTime;

    @NotBlank(message = "Selected city is required")
    private String city;

    @NotBlank(message = "Selected area is required")
    private String area;

    @NotBlank(message = "Hostel name is required")
    private String hostelName;

    @NotBlank(message = "Room type is required")
    private String roomType;

    @NotBlank(message = "Room number is required")
    private String roomNumber;

    @NotNull(message = "Number of hours is required")
    @Min(value = 1, message = "Number of hours must be positive")
    private Integer numberOfHours;

    @NotNull(message = "Room id is required")
    private Long roomId;

    @NotBlank(message = "Payment method is required")
    private String paymentMethod;
}

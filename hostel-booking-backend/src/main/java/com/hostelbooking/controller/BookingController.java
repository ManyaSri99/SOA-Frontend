package com.hostelbooking.controller;

import com.hostelbooking.dto.CustomerBookingRequest;
import com.hostelbooking.dto.BookingResponse;
import com.hostelbooking.model.Booking;
import com.hostelbooking.service.BookingService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class BookingController {

    private final BookingService bookingService;

    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    @GetMapping("/bookings")
    public List<Booking> getAllBookings() {
        return bookingService.getAllBookings();
    }

    @PostMapping("/bookings")
    public ResponseEntity<BookingResponse> createBooking(@RequestBody CustomerBookingRequest request) {
        return ResponseEntity.ok(bookingService.createBooking(request));
    }

    @GetMapping("/bookings/responses")
    public List<BookingResponse> getBookingResponses() {
        return bookingService.getBookingResponses();
    }
}

package com.hostelbooking.service;

import com.hostelbooking.dto.CustomerBookingRequest;
import com.hostelbooking.dto.BookingResponse;
import com.hostelbooking.exception.ApiException;
import com.hostelbooking.model.*;
import com.hostelbooking.repository.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class BookingService {

    private final BookingRepository bookingRepository;
    private final CustomerRepository customerRepository;
    private final RoomRepository roomRepository;
    private final HostelRepository hostelRepository;
    private final PaymentRepository paymentRepository;
    private final NotificationRepository notificationRepository;

    public BookingService(BookingRepository bookingRepository,
                         CustomerRepository customerRepository,
                         RoomRepository roomRepository,
                         HostelRepository hostelRepository,
                         PaymentRepository paymentRepository,
                         NotificationRepository notificationRepository) {
        this.bookingRepository = bookingRepository;
        this.customerRepository = customerRepository;
        this.roomRepository = roomRepository;
        this.hostelRepository = hostelRepository;
        this.paymentRepository = paymentRepository;
        this.notificationRepository = notificationRepository;
    }

    @Transactional
    public BookingResponse createBooking(CustomerBookingRequest request) {
        if (request.getCheckInDate().isAfter(request.getCheckOutDate()) ||
            (request.getCheckInDate().isEqual(request.getCheckOutDate()) && request.getCheckInTime().isAfter(request.getCheckOutTime()))) {
            throw new ApiException("Please select a valid booking time.");
        }

        Room room = roomRepository.findById(request.getRoomId())
            .orElseThrow(() -> new ApiException("Invalid room ID"));

        if (!"AVAILABLE".equalsIgnoreCase(room.getStatus())) {
            throw new ApiException("Room is already booked for the selected time.");
        }

        if (request.getNumberOfHours() == null || request.getNumberOfHours() <= 0) {
            throw new ApiException("Number of hours must be positive");
        }

        Optional<Customer> existingCustomer = customerRepository.findByEmail(request.getEmail());
        Customer customer = existingCustomer.orElseGet(() -> {
            Customer newCustomer = new Customer();
            newCustomer.setFullName(request.getFullName());
            newCustomer.setMobileNumber(request.getMobileNumber());
            newCustomer.setEmail(request.getEmail());
            newCustomer.setAge(request.getAge());
            newCustomer.setGender(request.getGender());
            newCustomer.setIdProofType(request.getIdProofType());
            newCustomer.setIdProofNumber(request.getIdProofNumber());
            newCustomer.setNumberOfGuests(request.getNumberOfGuests());
            return customerRepository.save(newCustomer);
        });

        if (existingCustomer.isEmpty() && !request.getMobileNumber().matches("\\d{10}")) {
            throw new ApiException("Mobile number must contain 10 digits.");
        }

        Hostel hostel = hostelRepository.findById(room.getHostel().getId())
            .orElseThrow(() -> new ApiException("Hostel not found"));

        double pricePerHour = room.getPricePerHour() != null ? room.getPricePerHour() : 0.0;
        double totalAmount = pricePerHour * request.getNumberOfHours();

        String bookingId = "HB" + System.currentTimeMillis();

        Booking booking = new Booking();
        booking.setBookingId(bookingId);
        booking.setCustomer(customer);
        booking.setRoom(room);
        booking.setHostel(hostel);
        booking.setCheckInDate(request.getCheckInDate());
        booking.setCheckInTime(request.getCheckInTime());
        booking.setCheckOutDate(request.getCheckOutDate());
        booking.setCheckOutTime(request.getCheckOutTime());
        booking.setNumberOfHours(request.getNumberOfHours());
        booking.setPricePerHour(pricePerHour);
        booking.setTotalAmount(totalAmount);
        booking.setPaymentStatus(request.getPaymentMethod().equalsIgnoreCase("CASH_AT_HOSTEL") ? "PAY_AT_HOSTEL" : "PAID");
        booking.setBookingStatus("CONFIRMED");
        booking.setPaymentMethod(request.getPaymentMethod());
        booking.setCity(request.getCity());
        booking.setArea(request.getArea());
        booking = bookingRepository.save(booking);

        room.setStatus("BOOKED");
        roomRepository.save(room);

        if ("CASH_AT_HOSTEL".equalsIgnoreCase(request.getPaymentMethod())) {
            Payment payment = new Payment();
            payment.setPaymentId("PAY" + UUID.randomUUID().toString().substring(0, 8).toUpperCase());
            payment.setBookingId(bookingId);
            payment.setAmount(totalAmount);
            payment.setPaymentMethod(request.getPaymentMethod());
            payment.setPaymentDate(LocalDateTime.now());
            payment.setPaymentStatus("PAY_AT_HOSTEL");
            paymentRepository.save(payment);
        } else {
            Payment payment = new Payment();
            payment.setPaymentId("PAY" + UUID.randomUUID().toString().substring(0, 8).toUpperCase());
            payment.setBookingId(bookingId);
            payment.setAmount(totalAmount);
            payment.setPaymentMethod(request.getPaymentMethod());
            payment.setPaymentDate(LocalDateTime.now());
            payment.setPaymentStatus("PAID");
            paymentRepository.save(payment);
        }

        Notification notification = new Notification();
        notification.setTitle("NEW BOOKING RECEIVED");
        notification.setMessage("Booking ID: " + bookingId + " | Customer: " + customer.getFullName() + " | Room: " + room.getRoomType().getName() + " | Amount: ₹" + totalAmount);
        notification.setRecipientType("HOSTEL_MANAGER");
        notification.setStatus("UNREAD");
        notification.setCreatedAt(LocalDateTime.now());
        notification.setBookingId(bookingId);
        notificationRepository.save(notification);

        return mapToResponse(booking);
    }

    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    public List<BookingResponse> getBookingResponses() {
        List<Booking> bookings = bookingRepository.findAll();
        List<BookingResponse> responses = new ArrayList<>();
        for (Booking booking: bookings) {
            responses.add(mapToResponse(booking));
        }
        return responses;
    }

    private BookingResponse mapToResponse(Booking booking) {
        BookingResponse response = new BookingResponse();
        response.setBookingId(booking.getBookingId());
        response.setCustomerName(booking.getCustomer().getFullName());
        response.setHostelName(booking.getHostel().getName());
        response.setCity(booking.getCity());
        response.setArea(booking.getArea());
        response.setRoomType(booking.getRoom().getRoomType().getName());
        response.setRoomNumber(booking.getRoom().getRoomNumber());
        response.setCheckInDate(booking.getCheckInDate());
        response.setCheckInTime(booking.getCheckInTime());
        response.setCheckOutDate(booking.getCheckOutDate());
        response.setCheckOutTime(booking.getCheckOutTime());
        response.setNumberOfHours(booking.getNumberOfHours());
        response.setPricePerHour(booking.getPricePerHour());
        response.setTotalRoomCost(booking.getTotalAmount());
        response.setPaymentStatus(booking.getPaymentStatus());
        response.setBookingStatus(booking.getBookingStatus());
        return response;
    }
}

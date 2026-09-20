package com.hostelbooking.service;

import com.hostelbooking.exception.ApiException;
import com.hostelbooking.model.Customer;
import com.hostelbooking.repository.CustomerRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomerService {

    private final CustomerRepository customerRepository;

    public CustomerService(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    public Customer saveCustomer(Customer customer) {
        if (customerRepository.findByEmail(customer.getEmail()).isPresent()) {
            throw new ApiException("Email already registered");
        }
        if (customerRepository.findByMobileNumber(customer.getMobileNumber()).isPresent()) {
            throw new ApiException("Mobile number already registered");
        }
        return customerRepository.save(customer);
    }

    public List<Customer> getAllCustomers() {
        return customerRepository.findAll();
    }

    public Customer getCustomerById(Long customerId) {
        return customerRepository.findById(customerId)
            .orElseThrow(() -> new ApiException("Customer not found"));
    }
}

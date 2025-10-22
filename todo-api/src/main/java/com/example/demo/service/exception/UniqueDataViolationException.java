package com.example.demo.service.exception;

public class UniqueDataViolationException extends RuntimeException{
    public UniqueDataViolationException(String message) {
        super(message);
    }
}

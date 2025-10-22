package com.example.demo.service.exception;

public class NotFoundObjectException extends RuntimeException {
    public NotFoundObjectException(String message) {
        super(message);
    }
}

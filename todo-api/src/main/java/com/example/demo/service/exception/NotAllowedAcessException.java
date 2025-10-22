package com.example.demo.service.exception;

public class NotAllowedAcessException extends RuntimeException {
    public NotAllowedAcessException(String message) {
        super(message);
    }
}

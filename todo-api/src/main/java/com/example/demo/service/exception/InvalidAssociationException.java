package com.example.demo.service.exception;

public class InvalidAssociationException extends RuntimeException {
    public InvalidAssociationException(String message) {
        super(message);
    }
}

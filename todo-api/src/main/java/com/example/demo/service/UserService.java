package com.example.demo.service;

import com.example.demo.config.encryption.XOR;
import com.example.demo.entities.User;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.exception.NotFoundObjectException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private XOR xor;

    public User update(String id, User user) {
        if (user.getName().isEmpty() || user.getPassword().isEmpty()) {
            throw new IllegalArgumentException("Username or password is empty");
        }

        User update = userRepository.findById(UUID.fromString(xor.decode(id))).orElseThrow(
                () -> new NotFoundObjectException("Not found user with id: " + id)
        );

        update.setName(user.getName());
        update.setPassword(xor.encode(user.getPassword()));

        return userRepository.save(update);
    }

    public void deleteById(String id) {
        User user = userRepository.findById(UUID.fromString(xor.decode(id))).orElseThrow(
                () -> new NotFoundObjectException("Not found user with id: " + id)
        );
        userRepository.deleteById(user.getId());
    }
}

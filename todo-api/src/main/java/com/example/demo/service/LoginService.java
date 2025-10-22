package com.example.demo.service;

import com.example.demo.config.encryption.XOR;
import com.example.demo.dto.CollectionDto;
import com.example.demo.dto.login.LoginRequest;
import com.example.demo.dto.login.LoginResponse;
import com.example.demo.entities.Collection;
import com.example.demo.entities.User;
import com.example.demo.repository.CollectionRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.exception.InvalidCredentialsException;
import com.example.demo.service.exception.UniqueDataViolationException;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LoginService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CollectionRepository collectionRepository;

    @Autowired
    private XOR xor;

    public LoginRequest login(LoginResponse loginResponse) {
        User user = userRepository.findByName(loginResponse.getName()).orElseThrow(
                () -> new InvalidCredentialsException("Username or password is incorrect")
        );

        boolean isValidPassword = xor.match(loginResponse.getPassword(), user.getPassword());

        if (!isValidPassword) {
            throw new InvalidCredentialsException("Username or password is incorrect");
        }

        List<Collection> collections = collectionRepository.findByUserId(user.getId());

        List<CollectionDto> collectionDtos = collections.stream()
                .map(collection -> {
                    CollectionDto collectionDto = new CollectionDto();
                    BeanUtils.copyProperties(collection, collectionDto);
                    return collectionDto;
                })
                .toList();

        LoginRequest loginRequest = new LoginRequest();
        loginRequest.setId(xor.encode(user.getId().toString()));
        loginRequest.setName(user.getName());
        loginRequest.setCollections(collectionDtos);

        return loginRequest;
    }

    public User signup(User user) {
        boolean nameAlreadyExists = userRepository.findByName(user.getName()).isPresent();

        if (nameAlreadyExists) {
            throw new UniqueDataViolationException("User with name " + user.getName() + " already exists");
        }

        User create = new User();
        create.setName(user.getName());
        create.setPassword(xor.encode(user.getPassword()));
        return userRepository.save(create);
    }
}

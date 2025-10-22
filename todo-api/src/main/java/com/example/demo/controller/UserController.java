package com.example.demo.controller;

import com.example.demo.dto.record.UserRecordDto;
import com.example.demo.entities.User;
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    @PutMapping
    public ResponseEntity<Void> update(@RequestHeader("user-id") String id,
                                       @RequestBody UserRecordDto userRecordDto) {

        User user = new User();
        user.setName(userRecordDto.name());
        user.setPassword(userRecordDto.password());

        userService.update(id, user);

        return ResponseEntity.ok().build();
    }

    @DeleteMapping
    public ResponseEntity<Void> deleteById(@RequestHeader("user-id") String id) {
        userService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}

package com.example.demo.dto.login;

import com.example.demo.dto.CollectionDto;

import java.io.Serial;
import java.io.Serializable;
import java.util.List;

public class LoginRequest implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;

    private String id;
    private String name;
    private List<CollectionDto> collections;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<CollectionDto> getCollections() {
        return collections;
    }

    public void setCollections(List<CollectionDto> collections) {
        this.collections = collections;
    }
}

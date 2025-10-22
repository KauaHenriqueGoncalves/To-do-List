package com.example.demo.repository;

import com.example.demo.entities.Collection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface CollectionRepository extends JpaRepository<Collection, Long> {
    List<Collection> findByUserId(UUID id);
}

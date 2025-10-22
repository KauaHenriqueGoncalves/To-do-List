package com.example.demo.controller;

import com.example.demo.dto.CollectionDto;
import com.example.demo.dto.record.CollectionRecordDto;
import com.example.demo.entities.Collection;
import com.example.demo.service.CollectionService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class CollectionController {

    @Autowired
    private CollectionService collectionService;

    @GetMapping("/collection")
    public ResponseEntity<List<CollectionDto>> findAllById(@RequestHeader("user-id") String id) {
        List<CollectionDto> collectionDtos = collectionService.findAllById(id);
        return ResponseEntity.ok().body(collectionDtos);
    }

    @PostMapping("/collection")
    public ResponseEntity<Void> create(@RequestHeader("user-id") String id,
                                       @RequestBody CollectionRecordDto collectionRecordDto) {

        Collection collection = new Collection();
        collection.setName(collectionRecordDto.name());

        collection = collectionService.create(id, collection);

        URI uri = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(collection.getId())
                .toUri();

        return ResponseEntity.created(uri).build();
    }

    @PutMapping("/collection/{idCollection}")
    public ResponseEntity<CollectionDto> update(@RequestHeader("user-id") String idUser,
                                                @PathVariable Long idCollection,
                                                @RequestBody CollectionRecordDto collectionRecordDto) {

        Collection collection = new Collection();
        collection.setName(collectionRecordDto.name());
        collection = collectionService.update(idUser, idCollection, collection);

        CollectionDto collectionDto = new CollectionDto();
        BeanUtils.copyProperties(collection, collectionDto);

        return ResponseEntity.ok().body(collectionDto);
    }

    @DeleteMapping("/collection/{idCollection}")
    public ResponseEntity<Void> deleteById(@RequestHeader("user-id") String idUser,
                                           @PathVariable Long idCollection) {

        collectionService.deleteById(idUser, idCollection);
        return ResponseEntity.noContent().build();
    }
}

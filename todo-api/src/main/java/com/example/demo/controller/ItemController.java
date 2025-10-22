package com.example.demo.controller;

import com.example.demo.dto.ItemDto;
import com.example.demo.dto.record.ItemRecordDto;
import com.example.demo.entities.Item;
import com.example.demo.service.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class ItemController {

    @Autowired
    private ItemService itemService;

    @GetMapping("/collection/{idCollection}/item")
    public ResponseEntity<List<ItemDto>> findAllByUser(@RequestHeader("user-id") String idUser,
                                                       @PathVariable Long idCollection) {

        List<ItemDto> itemDtos = itemService.findAllByUser(idUser, idCollection);
        return ResponseEntity.ok().body(itemDtos);
    }

    @PostMapping("/collection/{idCollection}/item")
    public ResponseEntity<Void> create(@RequestHeader("user-id") String idUser,
                                       @PathVariable Long idCollection,
                                       @RequestBody ItemRecordDto itemRecordDto) {

        Item newItem = new Item();
        newItem.setName(itemRecordDto.name());
        newItem.setCheck(false);

        newItem = itemService.create(newItem, idUser, idCollection);

        URI uri = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(newItem.getId())
                .toUri();

        return ResponseEntity.created(uri).build();
    }

    @PutMapping("/collection/{idCollection}/item/{idItem}")
    public ResponseEntity<ItemDto> update(@RequestHeader("user-id") String idUser,
                                          @PathVariable Long idCollection,
                                          @PathVariable Long idItem,
                                          @RequestBody ItemRecordDto itemRecordDto) {

        Item update = new Item();
        update.setId(idItem);
        update.setName(itemRecordDto.name());
        update.setCheck(itemRecordDto.check());
        update = itemService.update(update, idUser, idCollection);

        ItemDto updatedItemDto = new ItemDto();
        updatedItemDto.setId(update.getId());
        updatedItemDto.setName(itemRecordDto.name());
        updatedItemDto.setCheck(itemRecordDto.check());

        return ResponseEntity.ok().body(updatedItemDto);
    }

    @DeleteMapping("/collection/{idCollection}/item/{idItem}")
    public ResponseEntity<Void> deleteById(@RequestHeader("user-id") String idUser,
                                           @PathVariable Long idCollection,
                                           @PathVariable Long idItem) {

        itemService.deleteById(idUser, idCollection, idItem);
        return ResponseEntity.noContent().build();
    }
}

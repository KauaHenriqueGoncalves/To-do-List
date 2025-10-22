package com.example.demo.service;

import com.example.demo.config.encryption.XOR;
import com.example.demo.dto.ItemDto;
import com.example.demo.entities.Collection;
import com.example.demo.entities.Item;
import com.example.demo.entities.User;
import com.example.demo.repository.CollectionRepository;
import com.example.demo.repository.ItemRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.exception.InvalidAssociationException;
import com.example.demo.service.exception.NotAllowedAcessException;
import com.example.demo.service.exception.NotFoundObjectException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

@Service
public class ItemService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CollectionRepository collectionRepository;

    @Autowired
    private ItemRepository itemRepository;

    @Autowired
    private XOR xor;

    public List<ItemDto> findAllByUser(String idUser, Long idCollection) {
        User user = userRepository.findById(UUID.fromString(xor.decode(idUser))).orElseThrow(
                () -> new NotFoundObjectException("Not found user with id: " + idUser)
        );

        Collection collection = collectionRepository.findById(idCollection).orElseThrow(
                () -> new NotFoundObjectException("Not found collection with id: " + idCollection)
        );

        if (!user.getId().equals(collection.getUser().getId())) {
            throw new NotAllowedAcessException("User is not allowed to access this collection");
        }

        List<Item> items = itemRepository.findByCollection_id(collection.getId());

        List<ItemDto> itemsDtos = items.stream()
                .map(item -> {
                    ItemDto itemDto = new ItemDto();
                    itemDto.setId(item.getId());
                    itemDto.setName(item.getName());
                    itemDto.setCheck(item.getCheck());
                    return itemDto;
                })
                .toList();

        return itemsDtos;
    }

    public Item create(Item item, String idUser, Long idCollection) {
        User user = userRepository.findById(UUID.fromString(xor.decode(idUser))).orElseThrow(
                () -> new NotFoundObjectException("Not found user with id: " + idUser)
        );

        Collection collection = collectionRepository.findById(idCollection).orElseThrow(
                () -> new NotFoundObjectException("Not found collection with id: " + idCollection)
        );

        if (!user.getId().equals(collection.getUser().getId())) {
            throw new NotAllowedAcessException("User is not allowed to access this collection");
        }

        Item create = new Item();
        create.setName(item.getName());
        create.setCheck(false);
        create.setCollection(collection);

        return itemRepository.save(create);
    }

    public Item update(Item item, String idUser, Long idCollection) {
        User user = userRepository.findById(UUID.fromString(xor.decode(idUser))).orElseThrow(
                () -> new NotFoundObjectException("Not found user with id: " + idUser)
        );

        Collection collection = collectionRepository.findById(idCollection).orElseThrow(
                () -> new NotFoundObjectException("Not found collection with id: " + idCollection)
        );

        Item update = itemRepository.findById(item.getId()).orElseThrow(
                () -> new NotFoundObjectException("Not found item with id: " + idUser)
        );

        if (!user.getId().equals(collection.getUser().getId())) {
            throw new NotAllowedAcessException("User is not allowed to access this collection");
        }

        if (!update.getCollection().getId().equals(collection.getId())) {
            throw new InvalidAssociationException("Invalid association between collection and item.");
        }

        update.setName(item.getName());
        update.setCheck(item.getCheck());
        update.setUpdatedAt(Instant.now());

        return itemRepository.save(update);
    }

    public void deleteById(String idUser, Long idCollection, Long idItem) {
        User user = userRepository.findById(UUID.fromString(xor.decode(idUser))).orElseThrow(
                () -> new NotFoundObjectException("Not found user with id: " + idUser)
        );

        Collection collection = collectionRepository.findById(idCollection).orElseThrow(
                () -> new NotFoundObjectException("Not found collection with id: " + idCollection)
        );

        Item item = itemRepository.findById(idItem).orElseThrow(
                () -> new NotFoundObjectException("Not found item with id: " + idUser)
        );

        if (!user.getId().equals(collection.getUser().getId())) {
            throw new NotAllowedAcessException("User is not allowed to access this collection");
        }

        if (!item.getCollection().getId().equals(collection.getId())) {
            throw new InvalidAssociationException("Invalid association between collection and item.");
        }

        itemRepository.deleteById(item.getId());
    }
}

package com.example.demo.service;

import com.example.demo.config.encryption.XOR;
import com.example.demo.dto.CollectionDto;
import com.example.demo.entities.Collection;
import com.example.demo.entities.User;
import com.example.demo.repository.CollectionRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.exception.NotAllowedAcessException;
import com.example.demo.service.exception.NotFoundObjectException;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class CollectionService {

    @Autowired
    private CollectionRepository collectionRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private XOR xor;

    public List<CollectionDto> findAllById(String id) {
        String decodeId = xor.decode(id);

        User user = userRepository.findById(UUID.fromString(decodeId)).orElseThrow(
                () -> new NotFoundObjectException("Not found User with id: " + decodeId)
        );

        List<Collection> collections = collectionRepository.findByUserId(user.getId());

        List<CollectionDto> collectionDtos = collections.stream()
                .map(collection -> {
                    CollectionDto collectionDto = new CollectionDto();
                    BeanUtils.copyProperties(collection, collectionDto);
                    return collectionDto;
                })
                .toList();

        return collectionDtos;
    }

    public Collection create(String id, Collection collection) {
        User user = userRepository.findById(UUID.fromString(xor.decode(id))).orElseThrow(
                () -> new NotFoundObjectException("Not found user with id: " + id)
        );

        Collection create = new Collection();
        create.setName(collection.getName());
        create.setUser(user);

        return collectionRepository.save(create);
    }

    public Collection update(String idUser, Long idCollection, Collection newCollection) {
        User user = userRepository.findById(UUID.fromString(xor.decode(idUser))).orElseThrow(
                () -> new NotFoundObjectException("Not found user with id: " + idUser)
        );

        Collection collection = collectionRepository.findById(idCollection).orElseThrow(
                () -> new NotFoundObjectException("Not found collection with id: " + idCollection)
        );

        if (!user.getId().equals(collection.getUser().getId())) {
            throw new NotAllowedAcessException("User is not allowed to access this collection");
        }

        collection.setName(newCollection.getName());

        return collectionRepository.save(collection);
    }

    public void deleteById(String idUser, Long idCollection) {
        User user = userRepository.findById(UUID.fromString(xor.decode(idUser))).orElseThrow(
                () -> new NotFoundObjectException("Not found user with id: " + idUser)
        );

        Collection collection = collectionRepository.findById(idCollection).orElseThrow(
                () -> new NotFoundObjectException("Not found collection with id: " + idCollection)
        );

        if (!user.getId().equals(collection.getUser().getId())) {
            throw new NotAllowedAcessException("User is not allowed to access this collection");
        }

        collectionRepository.deleteById(collection.getId());
    }

}

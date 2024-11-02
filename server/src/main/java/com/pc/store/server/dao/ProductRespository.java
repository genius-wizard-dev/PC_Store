package com.pc.store.server.dao;

import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.pc.store.server.entities.Product;

@Repository
public interface ProductRespository extends MongoRepository<Product, ObjectId> {
    Page<Product> findAllBy(Pageable pageable);

    List<Product> findByNameContaining(String name);
}

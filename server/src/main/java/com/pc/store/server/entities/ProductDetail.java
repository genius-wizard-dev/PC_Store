package com.pc.store.server.entities;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;
import org.springframework.data.mongodb.core.mapping.Field;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
@Document(collection = "product_details")
public class ProductDetail {
    @Id
    @Field("_id")
    String id;

    List<String> images;

    @DocumentReference
    @Field("productId")
    Product product;

    String processor;
    String ram;
    String storage;
    String graphicsCard;
    String powerSupply;
    String motherboard;

    @Field("case")
    String case_;

    String coolingSystem;
    String operatingSystem;
}

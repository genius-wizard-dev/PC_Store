package com.pc.store.server.entities;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
@Document(collection = "products")
public class Product {
    @Id
    @Field("_id")
    ObjectId id;

    String name;
    String img;
    double priceAfterDiscount;
    double originalPrice;
    double discountPercent;
    double priceDiscount;
    Supplier supplier;
}

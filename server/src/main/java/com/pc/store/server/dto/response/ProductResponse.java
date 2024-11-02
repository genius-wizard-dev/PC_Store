package com.pc.store.server.dto.response;
import com.pc.store.server.entities.Supplier;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.bson.types.ObjectId;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ProductResponse {
    ObjectId id;
    String name;
    String img;
    double priceAfterDiscount;
    double originalPrice;
    double discountPercent;
    double priceDiscount;
    Supplier supplier;
}
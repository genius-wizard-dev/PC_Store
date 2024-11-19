package com.pc.store.server.dto.request;

import com.pc.store.server.entities.CartItem;
import com.pc.store.server.entities.OrderStatus;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class OrderCreationRequest {
    String customerId;
    String shipAddress;
    List<CartItem> items;
    double totalPrice;
    String isPaid;
    String orderStatus;
}

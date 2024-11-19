package com.pc.store.server.controllers;

import com.pc.store.server.dto.request.ApiResponse;
import com.pc.store.server.dto.request.OrderCreationRequest;
import com.pc.store.server.entities.Order;
import com.pc.store.server.services.OrderService;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.bson.types.ObjectId;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@FieldDefaults(level = lombok.AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
@RequestMapping("/api/orders")
public class OrderController {
    OrderService orderService;

    @PostMapping
    public ApiResponse<Boolean> saveOrder(@RequestBody OrderCreationRequest request){
        boolean result = orderService.saveOrder(request);
        return ApiResponse.<Boolean>builder().result(result).build();
    }
    @GetMapping("/{customerId}")
    public ApiResponse<List<Order>> getOrders(@PathVariable String customerId){
        return ApiResponse.<List<Order>>builder().result(orderService.getAllOrders(new ObjectId(customerId))
        ).build();
    }
    @PutMapping("/{orderId}")
    public ApiResponse<Order> updateOrderStatus(@PathVariable String orderId, @RequestParam String status){
        var result = orderService.updateOrderStatus(new ObjectId(orderId), status);
        return ApiResponse.<Order>builder().result(result).build();
    }
}

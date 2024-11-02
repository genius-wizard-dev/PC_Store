package com.pc.store.server.controllers;

import com.pc.store.server.dto.request.ApiResponse;
import com.pc.store.server.entities.Product;
import com.pc.store.server.services.ProductService;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@FieldDefaults(level = lombok.AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
@RequestMapping("/api/products")
public class ProductController {
    ProductService productService;

    @GetMapping
    public ApiResponse<Page<Product>> getProducts(@RequestParam(defaultValue = "0") int page,
                                                          @RequestParam(defaultValue = "10") int size){
        var products = productService.getProductsByPage(page, size);
        return ApiResponse.<Page<Product>>builder().result(products).build();
    }

    @GetMapping("asc")
    public ApiResponse<Page<Product>> getProductsAsc(@RequestParam(defaultValue = "0") int page,
                                                     @RequestParam(defaultValue = "10") int size){
        var products = productService.getProductsByPageAsc(page, size);
        return ApiResponse.<Page<Product>>builder().result(products).build();
    }

    @GetMapping("desc")
    public ApiResponse<Page<Product>> getProductsDesc(@RequestParam(defaultValue = "0") int page,
                                                      @RequestParam(defaultValue = "10") int size){
        var products = productService.getProductsByPageDesc(page, size);
        return ApiResponse.<Page<Product>>builder().result(products).build();
    }
}

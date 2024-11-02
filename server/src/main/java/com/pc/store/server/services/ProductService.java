package com.pc.store.server.services;

import com.pc.store.server.dao.ProductRespository;
import com.pc.store.server.dto.response.ProductResponse;
import com.pc.store.server.entities.Product;
import com.pc.store.server.mapper.ProductMapper;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@FieldDefaults(level = lombok.AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class ProductService {

    ProductRespository productRespository;
    ProductMapper productMapper;

    public Page<Product> getProductsByPage(int page, int size){
        Pageable pageable = PageRequest.of(page, size);
        return productRespository.findAllBy(pageable);
    }
    public Page<Product> getProductsByPageAsc(int page, int size){
        Pageable pageable = PageRequest.of(page, size, Sort.by("priceAfterDiscount").ascending());
        return productRespository.findAllBy(pageable);
    }
    public Page<Product> getProductsByPageDesc(int page, int size){
        Pageable pageable = PageRequest.of(page, size, Sort.by("priceAfterDiscount").descending());
        return productRespository.findAllBy(pageable);
    }

    public List<ProductResponse> getProductByName(String name){
       List<Product> products = productRespository.findByNameContaining(name);
        return products.stream().map(productMapper::toProductResponse).toList();
    }
}

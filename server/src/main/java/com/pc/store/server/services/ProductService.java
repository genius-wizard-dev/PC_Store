package com.pc.store.server.services;

import com.pc.store.server.dao.ProductRespository;
import com.pc.store.server.dto.response.ProductResponse;
import com.pc.store.server.entities.Product;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
@FieldDefaults(level = lombok.AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class ProductService {

    ProductRespository productRespository;

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
}

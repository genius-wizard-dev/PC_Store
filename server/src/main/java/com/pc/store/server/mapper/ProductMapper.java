package com.pc.store.server.mapper;

import com.pc.store.server.dto.response.ProductResponse;
import com.pc.store.server.entities.Product;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ProductMapper {
    Product toProduct(ProductResponse response);
    ProductResponse toProductResponse(Product product);
}

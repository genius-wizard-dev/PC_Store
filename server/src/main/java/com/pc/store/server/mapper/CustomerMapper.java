package com.pc.store.server.mapper;

import com.pc.store.server.entities.Role;
import org.mapstruct.Mapper;

import com.pc.store.server.dto.request.CustomerCreationResquest;
import com.pc.store.server.dto.response.CustomerResponse;
import com.pc.store.server.entities.Customer;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import java.util.Set;

@Mapper(componentModel = "spring")
public interface CustomerMapper {
    Customer toCustomer(CustomerCreationResquest request);

    CustomerResponse toCustomerResponse(Customer customer);


}

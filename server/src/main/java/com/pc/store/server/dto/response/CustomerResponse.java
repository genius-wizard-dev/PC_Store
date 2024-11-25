package com.pc.store.server.dto.response;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import com.pc.store.server.entities.Role;
import org.bson.types.ObjectId;

import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CustomerResponse {
    @JsonSerialize(using = ToStringSerializer.class)
    ObjectId id;
    String userName;
    String firstName;
    String lastName;
    String email;
    String phoneNumber;
    Set<Role> roles;
}

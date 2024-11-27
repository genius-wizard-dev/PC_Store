package com.pc.store.server.configurations;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.security.oauth2.server.resource.authentication.JwtGrantedAuthoritiesConverter;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@EnableAsync
public class MySecurity {
    private final String[] PUBLIC_ENDPOINTS = {
        "/api/customers/register", "/api/auth/log-in", "/api/auth/introspect", "/api/auth/logout", "/api/auth/refresh",
    };
    private final String[] PUBLIC_ENDPOINTS_GET = {
        "/api/products",
        "/api/products/id",
        "/api/products/asc",
        "/api/products/desc",
        "/api/products/{name}",
        "/api/product-detail/{id}",
        "/api/product-detail",
        "/api/payment/create_payment",
    };

    //    private  final String [] PUBLIC_ENDPOINTS_OPTIONS={
    //            "/api/customers/register", "/api/auth/log-in", "/api/auth/introspect", "/api/auth/logout",
    // "/api/auth/refresh",
    //            "/api/products",
    //            "/api/products/asc",
    //            "/api/products/desc",
    //            "/api/products/{name}",
    //            "/api/product-detail/{id}",
    //            "/api/product-detail",
    //            "/api/customers/info"
    //    };

    @Autowired
    private CustomJwtDecoder customJwtDecoder;

    @Bean
    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(10);
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        httpSecurity.authorizeHttpRequests(authRes -> authRes.requestMatchers(HttpMethod.POST, PUBLIC_ENDPOINTS)
                .permitAll()
                .requestMatchers(HttpMethod.GET, PUBLIC_ENDPOINTS_GET)
                .permitAll()
                //                .requestMatchers(HttpMethod.OPTIONS, PUBLIC_ENDPOINTS_OPTIONS)
                //                .permitAll()
                .requestMatchers("/api/admin/")
                .hasRole("ADMIN")
                .anyRequest()
                .authenticated());
        httpSecurity.oauth2ResourceServer(oauth -> oauth.jwt(
                        jwt -> jwt.decoder(customJwtDecoder).jwtAuthenticationConverter(jwtAuthenticationConverter()))
                .authenticationEntryPoint(new JwtAuthenticationEntryPoint()));
        httpSecurity.csrf(AbstractHttpConfigurer::disable);
        return httpSecurity.build();
    }

    JwtAuthenticationConverter jwtAuthenticationConverter() {
        JwtGrantedAuthoritiesConverter jwtGrantedAuthoritiesConverter = new JwtGrantedAuthoritiesConverter();
        jwtGrantedAuthoritiesConverter.setAuthorityPrefix("");
        JwtAuthenticationConverter jwtAuthenticationConverter = new JwtAuthenticationConverter();
        jwtAuthenticationConverter.setJwtGrantedAuthoritiesConverter(jwtGrantedAuthoritiesConverter);
        return jwtAuthenticationConverter;
    }
}

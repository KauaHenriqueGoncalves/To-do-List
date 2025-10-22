package com.example.demo.config;

import io.swagger.v3.oas.models.OpenAPI;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.core.io.ClassPathResource;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.dataformat.yaml.YAMLFactory;

@Configuration
@Profile("test")
public class OpenApiConfig {

    @Bean
    public OpenAPI customOpenAPI() throws Exception {
        ObjectMapper mapper = new ObjectMapper(new YAMLFactory());
        return mapper.readValue(
                new ClassPathResource("v3/api-docs/openapi.yaml").getInputStream(),
                OpenAPI.class
        );
    }
}
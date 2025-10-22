package com.example.demo.config;

import com.example.demo.config.encryption.XOR;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SecurityConfig {

    @Value("${security.key.xor}")
    private String key;

    @Bean
    public XOR xor() {
        return new XOR(key);
    }
}

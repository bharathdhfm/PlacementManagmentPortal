package com.kledf.springboot.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // Apply to all paths
                .allowedOrigins("http://localhost:3000") // Allow requests from React frontend
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Support preflight requests
                .allowedHeaders("*") // Allow all headers
                .allowCredentials(true) // Allow credentials (if needed, for cookies)
                .maxAge(3600); // Cache preflight response for 1 hour
    }
}

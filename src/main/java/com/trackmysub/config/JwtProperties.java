package com.trackmysub.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

/**
 * JWT Configuration properties mapped from application.yml / application.properties.
 */
@ConfigurationProperties(prefix = "app.jwt")
public record JwtProperties(
    String secret,
    long accessTokenExpirationMs,
    long refreshTokenExpirationMs
) {}

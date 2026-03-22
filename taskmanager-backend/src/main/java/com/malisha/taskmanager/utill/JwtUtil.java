package com.malisha.taskmanager.utill;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Base64;
import java.util.Date;

@Component
public class JwtUtil {

    private static final String SECRET_STRING =
            "bXlzdXBlcnNlY3JldGtleWZvcmp3dHRva2VuMTIzNDU2Nzg=";

    private final SecretKey SECRET_KEY = Keys.hmacShaKeyFor(
            Base64.getDecoder().decode(SECRET_STRING)
    );

    public String generateToken(String username,String role) {
        return Jwts.builder()
                .setSubject(username)
                .claim("role", role)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60))
                .signWith(SECRET_KEY)
                .compact();
    }

    public String extractUsername(String token) {
        return getClaims(token).getSubject();
    }

    private Claims getClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(SECRET_KEY)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
    public String extractRole(String token) {
        return getClaims(token).get("role", String.class);
    }
}
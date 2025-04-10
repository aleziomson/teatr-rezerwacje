package org.example.rezerwacje;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())  // Wyłączenie CSRF dla testów w Postmanie
                .authorizeHttpRequests(auth -> auth
                                .anyRequest().permitAll()
                        /*.requestMatchers("/api/seats", "/api/seats/**").permitAll()
                        .requestMatchers("/api/spektakle", "/api/spektakle/**").permitAll()
                        .requestMatchers(
                                "/api/login", "/api/register",
                                "/api/redis/request-confirmation", "/api/redis/request-confirmation/**"
                        ).permitAll()
                        .requestMatchers("/api/reservations", "/api/reservations/**").permitAll()
                        .requestMatchers("/api/redis", "/api/redis/**").permitAll()
                        .anyRequest().authenticated()*/

                );

        return http.build();
    }

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(); // Dodanie encoder'a do haseł
    }
}

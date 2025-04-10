package org.example.rezerwacje;

import org.springframework.data.jpa.repository.JpaRepository;

import javax.swing.text.html.Option;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email); // Szukamy użytkownika po emailu
    Optional<User> findById(Long id); //Szukamy użytkownika po id
    boolean existsByEmail(String email); // Sprawdzamy, czy email już istnieje
}

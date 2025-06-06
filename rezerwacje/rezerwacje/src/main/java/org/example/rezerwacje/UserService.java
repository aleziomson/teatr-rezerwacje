package org.example.rezerwacje;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;


    public UserService(UserRepository userRepository, BCryptPasswordEncoder passwordEncoder, JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }
    //Obsługa funkcji register
    public String registerUser(String email, String password) {
        if (userRepository.existsByEmail(email)) {
            return "Email już istnieje!";
        }
        //Zapisywanie użytkownika do bazy danych
        User user = new User();
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(password)); //szyfrowanie

        userRepository.save(user);
        return "Rejestracja udana!";
    }
    //Obsługa funkcji login
    public ResponseEntity<?> loginUser(String email, String password) {
        Optional<User> userOpt = userRepository.findByEmail(email);
        //Jeżeli user istnieje w bazie danych ustawiamy token na podstawie UserId
        // -> umożliwi obsługę front endu dla zalogowanych użytkowników
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            if (passwordEncoder.matches(password, user.getPassword())) {
                String token = jwtUtil.generateToken(user.getId());
                return ResponseEntity.ok(token);
            }
        }
        return ResponseEntity.status(401).body("Błędny login lub hasło");
    }


}

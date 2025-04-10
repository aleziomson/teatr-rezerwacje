package org.example.rezerwacje;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.Random;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/redis")
public class RedisController {

    private final RedisService redisService;
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private SpektakleRepository spektakleRepository;

    @Autowired
    private SeatRepository seatRepository;

    @Autowired
    private EmailService emailService;

    @Autowired
    public RedisController(RedisService redisService) {
        this.redisService = redisService;
    }

    @PostMapping("/save")
    public String saveCode(@RequestParam String key, @RequestParam String code) {
        redisService.saveCode(key, code); // 600 sekund = 10 minut
        return "Kod zapisany w Redisie na 10 minut.";
    }

    @GetMapping("/check")
    public boolean checkCode(@RequestParam String key, @RequestParam String code) {
        String storedCode = redisService.getCode(key);
        return code.equals(storedCode);
    }

    @DeleteMapping("/delete")
    public String deleteCode(@RequestParam String key) {
        redisService.deleteCode(key);
        return "Kod został usunięty.";
    }

    @GetMapping("/exists")
    public boolean exists(@RequestParam String key) {
        return redisService.exists(key);
    }

    @PostMapping("/request-confirmation")
    public ResponseEntity<?> requestConfirmation(@RequestParam Long userId,
                                                 @RequestParam Long spektaklId,
                                                 @RequestBody List<Long> seatIds) {
        Optional<User> user = userRepository.findById(userId);
        Optional<Spektakle> spektakl = spektakleRepository.findById(spektaklId);
        List<Seat> seats = seatRepository.findAllById(seatIds);

        if (user.isEmpty() || spektakl.isEmpty()) {
            return ResponseEntity.badRequest().body("Nie znaleziono danych.");
        }

        String code = generateRandomCode();
        String email = user.get().getEmail();
        String spektaklTitle = spektakl.get().getTitle();
        String spektaklDate = spektakl.get().getDate();

        // Konwertuj miejsca np. "A1, A2, A3"
        String seatList = seats.stream()
                .map(seat -> "Rząd " + seat.getRowNumber() + " Miejsce " + seat.getSeatNumber())
                .collect(Collectors.joining(", "));

        String message = "Dziękujemy za rezerwację.\n\n" +
                "Rezerwacja na spektakl: \"" + spektaklTitle + "\"\n" +
                "Data: " + spektaklDate + "\n" +
                "Zarezerwowane miejsca: " + seatList + "\n\n" +
                "Aby potwierdzić rezerwację, wpisz poniższy kod na stronie internetowej:\n" +
                code + "\n\n" +
                "Czas na potwierdzenie: 10 minut.";


        redisService.saveCode("user:" + userId, code);
        emailService.sendConfirmationEmail(email, message);

        return ResponseEntity.ok("Kod został wysłany.");
    }


    private String generateRandomCode() {
        int length = 6;
        String chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        StringBuilder code = new StringBuilder();
        Random random = new Random();
        for (int i = 0; i < length; i++) {
            code.append(chars.charAt(random.nextInt(chars.length())));
        }
        return code.toString();
    }
}

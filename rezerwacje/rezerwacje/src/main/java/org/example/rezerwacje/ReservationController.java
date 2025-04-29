package org.example.rezerwacje;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api")
public class ReservationController {

    @Autowired
    private ReservationRepository reservationRepository;

    @Autowired
    private SpektakleRepository spektakleRepository;

    @Autowired
    private SeatRepository seatRepository;

    //Tworzenie rezerwacji i zapisywanie jej do bazy danych
    @PostMapping("/reservations")
    public ResponseEntity<?> createReservation(@RequestBody Reservation reservation) {
        try {
            reservationRepository.save(reservation);
            return ResponseEntity.ok("Rezerwacja zapisana");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Błąd przy zapisie: " + e.getMessage());
        }
    }

    //Zwracanie rezerwacji użytkownika
    @GetMapping("/reservations/user/{userId}")
    public ResponseEntity<List<Reservation>> getReservationsByUser(@PathVariable Long userId) {
        List<Reservation> reservations = reservationRepository.findAllByUserId(userId);
        return ResponseEntity.ok(reservations);
    }

    //Zwracanie rezerwacji użytkownika dla poszczególnych spektakli
    @GetMapping("/reservations/user/{userId}/details")
    public ResponseEntity<?> getDetailedReservationsByUser(@PathVariable Long userId) {
        List<Reservation> reservations = reservationRepository.findAllByUserId(userId);

        Map<String, Map<String, Object>> grouped = new LinkedHashMap<>();
        for (Reservation res : reservations) {
            Optional<Spektakle> spektaklOpt = spektakleRepository.findById(res.getSpektaklId());
            Optional<Seat> seatOpt = seatRepository.findById(res.getSeatId().longValue());


            if (spektaklOpt.isEmpty() || seatOpt.isEmpty()) continue;

            Spektakle spektakl = spektaklOpt.get();
            Seat seat = seatOpt.get();

            String key = spektakl.getDate() + " | " + spektakl.getTitle();
            //Uzupełniamy dane spektaklu
            grouped.putIfAbsent(key, new LinkedHashMap<>());
            Map<String, Object> details = grouped.get(key);

            details.put("date", spektakl.getDate());
            details.put("title", spektakl.getTitle());

            // Dodaj informacje o miejscu do listy miejsc
            List<String> seatList = (List<String>) details.getOrDefault("seats", new ArrayList<>());
            seatList.add("Rząd " + seat.getRowNumber() + ", Miejsce " + seat.getSeatNumber());
            details.put("seats", seatList);
        }
        //Zwracamy szczegóły rezerwacji pogrupowane względem data i tytuł
        return ResponseEntity.ok(grouped.values());
    }

}

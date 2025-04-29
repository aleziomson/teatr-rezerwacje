package org.example.rezerwacje;

import jakarta.persistence.criteria.CriteriaBuilder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RestController
@RequestMapping("/api/seats")
public class SeatController {

    private final SeatRepository seatRepository;
    private final ReservationRepository reservationRepository;

    public SeatController(SeatRepository seatRepository, ReservationRepository reservationRepository) {
        this.seatRepository = seatRepository;
        this.reservationRepository = reservationRepository;
    }

    //Zwracamy miejsca z bazy danych
    @GetMapping
    public List<Map<String, Object>> getSeats(@RequestParam Long spektaklId) {
        List<Reservation> reservations = reservationRepository.findBySpektaklId(spektaklId);
        //Zajęte miejsca to takie, które znajdują się w tablicy rezervations
        Set<Integer> takenSeatIds = reservations.stream()
                .map(Reservation::getSeatId)
                .collect(Collectors.toSet());

        return seatRepository.findAll().stream()
                .map(seat -> {
                    Map<String, Object> map = new HashMap<>();
                    map.put("id", seat.getId());
                    map.put("row", seat.getRowNumber());
                    map.put("seat", seat.getSeatNumber());
                    map.put("taken", takenSeatIds.contains(seat.getId()));
                    return map;
                })
                .collect(Collectors.toList());
    }
}

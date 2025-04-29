package org.example.rezerwacje;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    List<Reservation> findBySpektaklId(Long spektaklId);
    List<Reservation> findByUserId(Long userId);
    List<Reservation> findAllByUserId(Long userId);
}

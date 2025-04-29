package org.example.rezerwacje;

import jakarta.persistence.*;
import lombok.Setter;

@Entity
@Table(name = "reservations")
public class Reservation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    //kolumny w MySQL
    @Setter
    @Column(name = "user_id")
    private Long userId;

    @Setter
    @Column(name = "spektakl_id")
    private Long spektaklId;

    @Setter
    @Column(name = "seat_id")
    private Integer seatId;

    // Gettery i settery
    public Long getId() {
        return id;
    }

    public Long getSpektaklId() {
        return spektaklId;
    }

    public Integer getSeatId() {
        return seatId;
    }

    public Long getUserId() {return userId;}

}

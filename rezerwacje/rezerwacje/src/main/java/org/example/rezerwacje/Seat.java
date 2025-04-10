package org.example.rezerwacje;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Data
@Table(name = "seats")
public class Seat {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Getter
    @Column(name = "row_numb", nullable = false)
    private int rowNumber;
    @Column(name = "seat_numb", nullable = false)
    private int seatNumber;

}

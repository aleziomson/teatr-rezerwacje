package org.example.rezerwacje;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

//Tworzenie tablicy spektakle, która będzie przechowywała spektakle jakie będą dostępne w najbliższym czasie i informacje o nich



@Entity
@Data
@NoArgsConstructor //domyslny konstruktor
@Table(name = "spektakle")
public class Spektakle {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String date;      // np. "2024-01-01"
    private String time;      // np. "18:00"
    private String location = "Sala Teatralna";  //  "Sala Teatralna" u nas tylko będzie

    public Spektakle(String title, String date, String time, String location) {
        this.title = title;
        this.date = date;
        this.time = time;
        this.location = location;
    }
}

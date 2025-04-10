package org.example.rezerwacje;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity //Entity mówi że ta klasa to tabela w bazie danych
@Data// automatyczne  tworzenie getterów i setterów
@NoArgsConstructor
@Table(name = "Uzytkownicy") //określa nazwę tabeli
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) //ustawia Id, który automatycznie się zwiększa
    private Long id;

    @Column(nullable = false , unique = true) //email musi być unikalny
    private String email;

    @Column(nullable = false)
    private String password;
}

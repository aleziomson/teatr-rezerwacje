package org.example.rezerwacje;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SpektakleService {
    private final SpektakleRepository repository;

    public SpektakleService(SpektakleRepository repository) {
        this.repository = repository;
    }
    //zapisywanie spektakli do listy spektakli
    public List<Spektakle> getAllSpectacles() {
        return repository.findAll();
    }
}

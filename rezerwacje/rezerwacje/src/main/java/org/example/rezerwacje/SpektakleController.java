package org.example.rezerwacje;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RestController
@RequestMapping("/api/spektakle")
public class SpektakleController {
    private final SpektakleService spektakleService;
    public SpektakleController(SpektakleService spektakleService){
        this.spektakleService=spektakleService;
    }
    //zwraca wszystkie spektakle
    @GetMapping
    public List<Spektakle> getAllSpektakle(){
        return spektakleService.getAllSpectacles();
    }
}

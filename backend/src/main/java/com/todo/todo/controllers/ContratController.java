package com.todo.todo.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.todo.todo.DTO.ContratDTO;
import com.todo.todo.entities.Contrat;
import com.todo.todo.repositories.ContratRepository;
import com.todo.todo.services.ContratService;
@CrossOrigin(origins = "*")

@RestController
@RequestMapping("/api/rest/contrat")
public class ContratController {

    @Autowired
    private ContratService contratService;

    @Autowired
    private ContratRepository contratRepository;

    @CrossOrigin(origins = "*")

    @GetMapping
    public List<Contrat> getContrats() {

        return contratService.getContrats();
    }
    

    @CrossOrigin(origins = "*")

    @GetMapping("/{id}")
    public Contrat updateContrat(@PathVariable Integer id, @RequestBody ContratDTO contratDTO) {

        Contrat contrat = contratRepository.findById(id).orElseThrow();

        contrat.setNom(contratDTO.getNom());

        contratRepository.save(contrat);

        return contrat;

    }

    @CrossOrigin(origins = "*")

    @PostMapping()
    public Contrat createContrat(@RequestBody ContratDTO contratDTO) {
        Contrat ob = new Contrat();
        ob.setNom(contratDTO.getNom());
        contratRepository.save(ob);
        return ob;
    }
}

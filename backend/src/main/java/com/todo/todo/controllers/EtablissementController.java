package com.todo.todo.controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.todo.todo.entities.Etablissement;
import com.todo.todo.services.EtablissementService;

import org.springframework.http.MediaType;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping(value = "/api/rest/etablissements", produces = MediaType.APPLICATION_JSON_VALUE)
public class EtablissementController {

    @Autowired
    private EtablissementService service;

    @CrossOrigin(origins = "*")

    @GetMapping
    public List<Etablissement> getAll() {
        return service.findAll();
    }

    @CrossOrigin(origins = "*")

    @GetMapping("/{id}")
    public ResponseEntity<Etablissement> getById(@PathVariable Integer id) {
        Optional<Etablissement> etablissement = service.findById(id);
        return etablissement.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @CrossOrigin(origins = "*")

    @PostMapping
    public Etablissement create(@RequestBody Etablissement etablissement) {
        return service.save(etablissement);
    }

    @CrossOrigin(origins = "*")

    @PutMapping("/{id}")
    public ResponseEntity<Etablissement> update(@PathVariable Integer id, @RequestBody Etablissement etablissement) {
        if (!service.findById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        etablissement.setId(id); // Assuming the entity has a setId method
        return ResponseEntity.ok(service.update(etablissement));
    }
    @CrossOrigin(origins = "*")


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        if (!service.findById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        service.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}

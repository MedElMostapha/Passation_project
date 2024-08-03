package com.todo.todo.controllers;



import org.springframework.http.MediaType;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.todo.todo.entities.Contrat;
import com.todo.todo.entities.InputBudgetaire;
import com.todo.todo.entities.ModeSelection;
import com.todo.todo.repositories.ContratRepository;
import com.todo.todo.repositories.ModeSelectionRepository;
import com.todo.todo.services.InputBudgetaireService;

@CrossOrigin(origins = "*")

@RestController
@RequestMapping(value = "/api/rest/input")
public class InputBudgetaireController {

    @Autowired
    private InputBudgetaireService inputBudgetaireService;

    @Autowired
    private ContratRepository contrat;
    @Autowired
    private ModeSelectionRepository mode;
    @CrossOrigin(origins = "*")

    @PostMapping()
    public InputBudgetaire createInputBudgetaire(@RequestParam Integer typeSelectionid,
            @RequestParam Integer typeMarcherid,
            @RequestParam Integer etablissementId) {
        return inputBudgetaireService.createInputBudgetaire(typeSelectionid, typeMarcherid, etablissementId);
    }
    @CrossOrigin(origins = "*")

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public List<InputBudgetaire> getInputs() {
        return inputBudgetaireService.getInputs();
    }

    @CrossOrigin(origins = "*")

    @GetMapping("/contrat")
    public List<Contrat> getContrats() {
        return contrat.findAll();
    }
    @CrossOrigin(origins = "*")

    @GetMapping("/mode")
    public List<ModeSelection> getMode() {
        return mode.findAll();
    }

    @CrossOrigin(origins = "*")

    @DeleteMapping("/{id}")
    public void deleteInput(@PathVariable Long id) {
        inputBudgetaireService.deleteInput(id);
        
    }

    

}

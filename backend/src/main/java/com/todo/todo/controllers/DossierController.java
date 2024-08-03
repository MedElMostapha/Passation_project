package com.todo.todo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.todo.todo.DTO.DossierDTO;
import com.todo.todo.DTO.LettreDTO;
import com.todo.todo.entities.Dossier;
import com.todo.todo.entities.Lettre;
import com.todo.todo.entities.ProcedurePaa;
import com.todo.todo.repositories.DossierRepository;
import com.todo.todo.repositories.ProcedureRepository;
import com.todo.todo.services.DossierService;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = "*")

@RestController
@RequestMapping("/api/rest/Dossier")
public class DossierController {

    @Autowired
    private DossierRepository dossierRepository;

    @Autowired
    private ProcedureRepository procedureRepository;

    // @Autowired
    // ServiceReport report;
    @Autowired
    private DossierService dossierService;

    @CrossOrigin(origins = "*")
    @GetMapping()
    public List<Dossier> getAllDossier() {
        return dossierRepository.findAll();
    }

    // @CrossOrigin(origins = "*")
    // @GetMapping("/getLettres/{id}")
    // public List<Lettre> getLettres(@PathVariable Integer id) {
    // return dossierService.getAllLettres(id);
    // }

    // @CrossOrigin(origins = "*")
    // @GetMapping("/LettresNotInPlis/{id}")
    // public List<Lettre> LettresNotInPlis(@PathVariable Integer id) {
    // return dossierService.LettresNotInPlis(id);
    // }

    @CrossOrigin(origins = "*")
    @PostMapping
    public Dossier createDosssier(@RequestBody Dossier data) {
        System.out.println("**********************************" + data);

        ProcedurePaa procedurePaa = procedureRepository.findById(data.getProcedure().getId()).orElseThrow();

        procedurePaa.setCreatedDossier(true);

        procedureRepository.save(procedurePaa);
        return dossierRepository.save(data);

    }

    @CrossOrigin(origins = "*")
    @PostMapping("/createLettre")
    public List<Lettre> createLettre(@RequestBody LettreDTO data) throws
    IOException {
    System.out.println("**********************************" + data);
    return dossierService.createLettre(data);
    }

    // @CrossOrigin(origins = "*")
    // @GetMapping(value = "/report/{id}", produces =
    // MediaType.APPLICATION_PDF_VALUE)
    // public ResponseEntity generateReport(@PathVariable Integer id,
    // @RequestParam("report-name") String reportName)
    // throws IOException, JRException {
    // return report.exportReportLettre(id, reportName);
    // }

    // @PutMapping("/{id}")
    // public Dossier updateEtat(@PathVariable Integer id) {
    // // TODO: process POST request

    // return dossierService.updateEtat(id);

    // }

}

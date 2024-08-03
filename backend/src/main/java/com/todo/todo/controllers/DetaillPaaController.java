package com.todo.todo.controllers;

import java.security.Principal;
import java.time.Instant;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import org.springframework.web.multipart.MultipartFile;

import com.todo.todo.DTO.PaaFormProcedure;
import com.todo.todo.entities.DetaillPaa;
import com.todo.todo.entities.InputBudgetaire;
import com.todo.todo.entities.Paa;
import com.todo.todo.entities.User;
import com.todo.todo.repositories.DetaillPaaRepository;
import com.todo.todo.repositories.InputBudgetaireRepository;
import com.todo.todo.repositories.PaaRepository;
import com.todo.todo.repositories.UserRepository;
import com.todo.todo.services.PaaService;

@CrossOrigin(origins = "*")

@RestController
@RequestMapping(value = "/api/rest/Paa", produces = MediaType.APPLICATION_JSON_VALUE)
public class DetaillPaaController {

    private static final Logger logger = LoggerFactory.getLogger(DetaillPaaController.class);

    @Autowired
    private PaaService service;

    @Autowired
    private InputBudgetaireRepository inputBudgetaireRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private DetaillPaaRepository DetaillPaaRepository;

    @Autowired
    private PaaRepository paaRepository;

    @CrossOrigin(origins = "*")
    @GetMapping
    public List<DetaillPaa> getDetailles() {

        return service.getAllPaa();
    }

    @GetMapping("/getPaa")
    public List<Paa> GetPaas() {
        return paaRepository.findAll();
    }

    @GetMapping("/latest")
    public List<Paa> getLatestPaaForAllEtablissements() {
        return paaRepository.findLatestPaaForAllEtablissements();
    }

    @PostMapping("/create")
    public ResponseEntity<Paa> postMethodName(@RequestBody Paa paa) {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = userRepository.findBynom(authentication.getName())
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        Paa newPaa = new Paa();
        newPaa.setCreated_at(Instant.now());
        newPaa.setEtablissement(paa.getEtablissement());
        newPaa.setEtat(paa.getEtat());
        newPaa.setUser(user);

        Paa savedPaa = paaRepository.save(newPaa);

        return ResponseEntity.ok(savedPaa);
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/{id}")
    public ResponseEntity<Optional<DetaillPaa>> getPaa(@PathVariable Integer id) {
        Optional<DetaillPaa> paa = service.getPaa(id);
        if (paa.isPresent()) {
            return ResponseEntity.ok(paa);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(paa);
        }
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/etablissement/{id}")
    public ResponseEntity<List<Paa>> getPlansByEtablissementId(@PathVariable Integer id) {
        List<Paa> plans = service.getPlansByEtablissementId(id);
        return ResponseEntity.ok(plans);
    }
    @CrossOrigin(origins = "*")
    @GetMapping("/detaill/{id}")
    public ResponseEntity<List<DetaillPaa>> getPlansByPaaId(@PathVariable Integer id) {
        List<DetaillPaa> plans = service.getPlansByPaaId(id);
        return ResponseEntity.ok(plans);
    }

    @CrossOrigin(origins = "*")
    @PostMapping("/upload")
    public void uploadFile(@RequestParam("file") MultipartFile file) {
        logger.info("File received: {}", file.getOriginalFilename());
        try {
            service.saveExcelData(file);
            // return ResponseEntity.ok("File uploaded and data saved successfully.");
        } catch (Exception e) {
            logger.error("Error uploading file: ", e);
            // return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
            //         .body("Failed to upload file and save data: " + e.getMessage());
        }
    }

    @GetMapping("/test")
    public String test() {
        return "hello";
    }

    @CrossOrigin(origins = "*")
    @PutMapping("/modifier/{id}")
    public ResponseEntity<DetaillPaa> modifyPaa(@PathVariable Integer id, @RequestBody DetaillPaa data) {
        try {
            DetaillPaa updatedPaa = service.modifierPaa(id, data);
            return ResponseEntity.ok(updatedPaa);
        } catch (Exception e) {
            logger.error("Error updating Paa: ", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @CrossOrigin(origins = "*")
    @PostMapping("/addPaa")
    public ResponseEntity<?> addPaaDetaill(@RequestBody PaaFormProcedure data) {
        InputBudgetaire inputBudgetaire = inputBudgetaireRepository.findByBudgetNumber(data.getInpuBudgetaire());

        if (inputBudgetaire == null) {
            return ResponseEntity.badRequest().body("InputBudgetaire not found");
        }

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = userRepository.findBynom(authentication.getName())
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        Paa paa = paaRepository.findById(data.getPaaid()).orElseThrow();
        // paa.setStatus(false);
        // paa.setCreated_at(LocalDate.now());
        // paa.setUser(user);
        // Paa savedPaa= paaRepository.save(paa);

        DetaillPaa newPaa = new DetaillPaa();
        newPaa.setObjetDepense(data.getObjetDepense());
        newPaa.setInpuBudgetaire(data.getInpuBudgetaire());
        newPaa.setTypeMarche(inputBudgetaire.getTypeMarcher());
        newPaa.setModPassation(inputBudgetaire.getTypeSelection());
        newPaa.setEtablissement(inputBudgetaire.getEtablissement());
        newPaa.setMntEstimatif(data.getMntEstimatif());
        newPaa.setDatePreviLancement(data.getDatePreviLancement());
        newPaa.setDatePreviAttribution(data.getDatePreviAttribution());
        newPaa.setMontantRestant(data.getMntEstimatif());
        newPaa.setUser(user);

        newPaa.setPaa(paa);

        // paa.setDetaillPaa(newPaa);

        DetaillPaa savedDetaillPaa = DetaillPaaRepository.save(newPaa);
        return ResponseEntity.ok(savedDetaillPaa);
    }

    @CrossOrigin(origins = "*")

    @PutMapping("/valider/{id}")
    public ResponseEntity<DetaillPaa> validatePaa(@PathVariable Integer id) {
        try {
            DetaillPaa validatedPaa = service.validatePlanAnuellAchat(id);
            return ResponseEntity.ok(validatedPaa);
        } catch (Exception e) {
            logger.error("Error validating Paa: ", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @CrossOrigin(origins = "*")
    @DeleteMapping("/deletePaa/{id}")
    public void deletePaa(@PathVariable Integer id) {
        try {
            service.deletePaa(id);
            // return ResponseEntity.ok("PAA deleted successfully");
        } catch (Exception e) {
            logger.error("Error deleting Paa: ", e);
            // return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to delete PAA");
        }
    }
}

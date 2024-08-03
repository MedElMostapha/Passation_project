package com.todo.todo.controllers;

import com.todo.todo.entities.ModeSelection;
import com.todo.todo.repositories.ModeSelectionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*")

@RestController
@RequestMapping("/api/rest/modeselection")
public class ModeSelectionController {

    @Autowired
    private ModeSelectionRepository modeSelectionRepository;
    @CrossOrigin(origins = "*")

    // Get all ModeSelections
    @GetMapping
    public List<ModeSelection> getAllModeSelections() {
        return modeSelectionRepository.findAll();
    }
    @CrossOrigin(origins = "*")

    // Get ModeSelection by ID
    @GetMapping("/{id}")
    public ResponseEntity<ModeSelection> getModeSelectionById(@PathVariable Integer id) {
        Optional<ModeSelection> modeSelection = modeSelectionRepository.findById(id);
        if (modeSelection.isPresent()) {
            return ResponseEntity.ok(modeSelection.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    @CrossOrigin(origins = "*")

    // Create a new ModeSelection
    @PostMapping
    public ModeSelection createModeSelection(@RequestBody ModeSelection modeSelection) {
        return modeSelectionRepository.save(modeSelection);
    }
    @CrossOrigin(origins = "*")

    // Update an existing ModeSelection
    @PutMapping("/{id}")
    public ResponseEntity<ModeSelection> updateModeSelection(@PathVariable Integer id, @RequestBody ModeSelection modeSelectionDetails) {
        Optional<ModeSelection> modeSelection = modeSelectionRepository.findById(id);
        if (modeSelection.isPresent()) {
            ModeSelection updatedModeSelection = modeSelection.get();
            updatedModeSelection.setNom(modeSelectionDetails.getNom());
            return ResponseEntity.ok(modeSelectionRepository.save(updatedModeSelection));
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    @CrossOrigin(origins = "*")

    // Delete a ModeSelection by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteModeSelection(@PathVariable Integer id) {
        Optional<ModeSelection> modeSelection = modeSelectionRepository.findById(id);
        if (modeSelection.isPresent()) {
            modeSelectionRepository.delete(modeSelection.get());
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}

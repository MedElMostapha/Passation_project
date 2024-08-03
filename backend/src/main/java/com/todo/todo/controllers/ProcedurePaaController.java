package com.todo.todo.controllers;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.todo.todo.entities.ProcedurePaa;
import com.todo.todo.services.FileDownloader;
import com.todo.todo.services.ProcedurePaaService;

@RestController
@RequestMapping("/api/rest/procedure")
@CrossOrigin("*")
public class ProcedurePaaController {

    @Autowired
    private ProcedurePaaService service;

    @Autowired
    private FileDownloader fileDownloader;

    @CrossOrigin(origins = "*")

    @GetMapping(produces = "application/json")
    public List<ProcedurePaa> getAll() {
        return service.findAll();
    }

    @CrossOrigin(origins = "*")

    @GetMapping("/{id}")
    public ResponseEntity<ProcedurePaa> getById(@PathVariable Integer id) {
        Optional<ProcedurePaa> procedurePaa = service.findById(id);
        return procedurePaa.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @CrossOrigin(origins = "*")

    @PostMapping(consumes = { "multipart/form-data" })
    public ProcedurePaa create(
            @RequestPart("procedure") ProcedurePaa procedureRequest,
            @RequestPart("file") MultipartFile file) {
        return service.createProcedure(procedureRequest, file);
    }

    @CrossOrigin(origins = "*")

    @PutMapping(value = "/{id}", consumes = { "multipart/form-data" })
    public ResponseEntity<ProcedurePaa> update(
            @PathVariable Integer id,
            @RequestPart("procedure") ProcedurePaa procedureRequest,
            @RequestPart("file") MultipartFile file) {
        try {
            ProcedurePaa updatedProcedure = service.updateProcedure(id, procedureRequest, file);
            return ResponseEntity.ok(updatedProcedure);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @CrossOrigin(origins = "*")

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {

        service.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @CrossOrigin(origins = "*")

    @GetMapping("/download")
    public ResponseEntity<Resource> downloadFile(@RequestParam("file") String filePath, @RequestParam("dossier") String dossier) {

        return this.fileDownloader.downloadFile(filePath,dossier);


    }
}

package com.todo.todo.services;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;


import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
public class FileDownloader {

    
    public ResponseEntity<Resource> downloadFile(String fileName,String dossierName) {
        Path fileStorageLocation = Paths.get("C:\\Users\\lapto\\Desktop\\todo\\src\\main\\resources\\uploads\\"+dossierName).toAbsolutePath().normalize();
        
        try {
            Path filePath = fileStorageLocation.resolve(fileName).normalize();
            Resource resource = new UrlResource(filePath.toUri());

            if (!resource.exists()) {
                throw new RuntimeException("File not found: " + fileName);
            }

            String contentType = Files.probeContentType(filePath);

            return ResponseEntity.ok()
                    .contentType(contentType == null ? org.springframework.http.MediaType.APPLICATION_OCTET_STREAM
                            : org.springframework.http.MediaType.parseMediaType(contentType))
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                    .body(resource);

        } catch (Exception ex) {
            throw new RuntimeException("Error in file download: " + ex.getMessage());
        }
    }

}

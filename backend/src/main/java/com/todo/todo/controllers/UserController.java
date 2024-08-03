package com.todo.todo.controllers;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.Collection;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.apache.commons.math3.analysis.function.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.todo.todo.UserDto.UserDto;
import com.todo.todo.entities.Role;
import com.todo.todo.entities.User;
import com.todo.todo.repositories.RoleRepository;
import com.todo.todo.repositories.UserRepository;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;

import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.JasperCompileManager;
import net.sf.jasperreports.engine.JasperExportManager;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.JasperReport;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @CrossOrigin(origins = "*")

    @GetMapping
    List<User> getUser() {

        return this.userRepository.findAll();
    }

    @CrossOrigin(origins = "*")

    @GetMapping("/roles/{id}")
    public Collection<? extends GrantedAuthority> getUserRoles(@PathVariable Long id) {

        User user = userRepository.findById(id).orElseThrow();


        return user.getAuthorities();
    }
    

    @Autowired
    private RoleRepository roleRepository;

    private ResourceLoader resourceLoader;

    public UserController(ResourceLoader resourceLoader) {
        this.resourceLoader = resourceLoader;
    }


    @CrossOrigin(origins = "*")


    @PostMapping
    public User createUser(@RequestBody UserDto userDto) {
        // Crypter le mot de passe avant de sauvegarder l'utilisateur
        User user = new User();
        user.setNom(userDto.getNom());
        user.setPrenom(userDto.getPrenom());
        user.setEmail(userDto.getEmail());
        user.setPassword(passwordEncoder.encode(userDto.getPassword()));

        Set<Role> roles = new HashSet<>();
        for (String roleName : userDto.getRoles()) {
            Role role = roleRepository.findByNom(roleName);
            if (role != null) {
                roles.add(role);
            } else {

                throw new RuntimeException("Role not found: " + roleName);

            }
        }
        user.setRoles(roles);
        return userRepository.save(user);
    }
    @CrossOrigin(origins = "*")


    @DeleteMapping("/{id}")
    void delete(@PathVariable Long id) {
        userRepository.deleteById(id);

    }
    @CrossOrigin(origins = "*")


    @GetMapping("/{id}")
    User userByID(@PathVariable Long id) {

        return userRepository.findById(id).get();

    }

    @CrossOrigin(origins = "*")

    @GetMapping("/pdf")
    public ResponseEntity<byte[]> getPdf() throws JRException, IOException {

        Resource resource = resourceLoader.getResource("classpath:testReport.jrxml");
        JasperReport jasperReport = JasperCompileManager.compileReport(resource.getInputStream());

        List<User> users = userRepository.findAll();
        JRBeanCollectionDataSource beanCollectionDataSource = new JRBeanCollectionDataSource(users);

        Map<String, Object> p = new HashMap<>();
        p.put("createdBy", "medlemine");

        JasperPrint jasperPrint = JasperFillManager.fillReport(jasperReport, p, beanCollectionDataSource);

        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
        JasperExportManager.exportReportToPdfStream(jasperPrint, byteArrayOutputStream);
        byte[] pdfBytes = byteArrayOutputStream.toByteArray();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_PDF);
        headers.setContentDispositionFormData("inline", "report.pdf");

        return ResponseEntity
                .ok()
                .headers(headers)
                .body(pdfBytes);
    }

}

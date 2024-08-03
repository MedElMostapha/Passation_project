package com.todo.todo.services;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.todo.todo.entities.Contrat;
import com.todo.todo.repositories.ContratRepository;

@Service
public class ContratService {


    @Autowired
    private ContratRepository contratRepo;


    public List<Contrat> getContrats() {

        return contratRepo.findAll();

    }
    
    public Contrat creatContrat(Contrat contrat) {

        Contrat contratObject = new Contrat();

        contratObject.setNom(contrat.getNom());
        
        return contratRepo.save(contratObject);
    }

}

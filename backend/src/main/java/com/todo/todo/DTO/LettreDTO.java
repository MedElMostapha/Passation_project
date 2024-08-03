package com.todo.todo.DTO;

import lombok.Data;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Data
public class LettreDTO {
    // private String nomFournissuer;
    private Collection FournisseurList = new ArrayList<>();
    private List<String> fournisseurs;
    private String nonAutoriteContractante;
    private Timestamp dateLimiteDepot;
    private Timestamp dateOverturePlis;
    private Timestamp dateAnterieurDepot;
    private String LieuOverturePlis;
    private Integer IdDossier;
    private int fkIduser;
    private String objetDepence;

}

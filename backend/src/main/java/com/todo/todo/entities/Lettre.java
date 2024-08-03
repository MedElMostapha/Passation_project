package com.todo.todo.entities;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import jakarta.persistence.*;
import java.io.Serializable;
import java.sql.Timestamp;

@Entity
@Table(name = "LETTRE")
@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Lettre implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String nomFournissuer;
    private String nonAutoriteContractante;
    private Timestamp dateLimiteDepot;
    private Timestamp dateOverturePlis;
    private Timestamp dateAnterieurDepot;
    private String lieuOverturePlis;
    private String objetDepence;

    
    private Integer idDossier;
    private int fkIduser;




    
}

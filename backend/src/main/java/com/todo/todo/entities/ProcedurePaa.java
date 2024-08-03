package com.todo.todo.entities;


import java.nio.file.Path;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import jakarta.persistence.*;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity

@Data
@NoArgsConstructor
@AllArgsConstructor

public class ProcedurePaa {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer Id;

    private String origin;
    private String destinataire;
    private String sourceFinanciere;
    private String description;
    private LocalDate deadlineEstime;
    private double montant;
    private String pathInitialProcedure;
    private String ProcedureFileNom;
    private String pathBesoin;
    private String BesoinFileNom;
    private Boolean createdDossier = false;

    @ManyToOne
    @JoinColumn(name = "paaid")
    private DetaillPaa paa;

    // @OneToMany(mappedBy = "procedure", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    // private List<Verdict> verdicts;

}

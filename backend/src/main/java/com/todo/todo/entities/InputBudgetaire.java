package com.todo.todo.entities;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.LocalDate;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "input_budgetaire")
public class InputBudgetaire implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "budget_number", unique = true, nullable = false)
    private String budgetNumber;

    @Column(name = "year", nullable = false)
    private int year;

    @Column(name = "unique_id", nullable = false)
    private int uniqueId;

    @Column(name = "created_date", nullable = false)
    private LocalDate createdDate;

    @ManyToOne()
    @JoinColumn(name = "etablissement_id", nullable = false)
    private Etablissement etablissement;

    
    @ManyToOne()
    @JoinColumn(name = "modeSelection", nullable = false)
    private ModeSelection typeSelection;
    @ManyToOne()
    @JoinColumn(name = "Contrat", nullable = false)
    private Contrat typeMarcher;
    // Constructors, getters, and setters
   

    
}

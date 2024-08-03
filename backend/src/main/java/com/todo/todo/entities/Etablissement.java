package com.todo.todo.entities;


import java.util.List;

import jakarta.persistence.*;


import org.hibernate.annotations.GenericGenerator;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Data;

@Entity
@Data


public class Etablissement {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "fourDigitIdGenerator")
    @GenericGenerator(name = "fourDigitIdGenerator", strategy = "com.todo.todo.entities.Generateur.FourDigitIdGenerator")
    private Integer id;

    private String nom;
    private String adresse;

   


    @OneToMany( cascade = CascadeType.ALL)
    private List<DetaillPaa> paa;

    @OneToMany( cascade = CascadeType.ALL)
    private List<InputBudgetaire> inputBudgetaires;
    // Ajoute d'autres attributs selon tes besoins

    // Constructeurs, getters et setters
}

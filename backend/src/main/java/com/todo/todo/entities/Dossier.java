package com.todo.todo.entities;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import jakarta.persistence.*;
import java.io.Serializable;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Dossier implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String reference;

    private boolean LettreCree = false; 
    private boolean ouvert = false;

    
    private String modelContrat;



    @ManyToOne
    @JoinColumn(name = "paa")
    private DetaillPaa paa;

    @ManyToOne
    @JoinColumn(name = "procedurePaa")
    private ProcedurePaa procedure;
  



    

}

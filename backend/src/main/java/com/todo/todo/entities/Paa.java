package com.todo.todo.entities;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.util.List;
import java.time.Instant;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Paa {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private Etat etat;

    private Instant Created_at = Instant.now();


    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    private Etablissement etablissement;

}

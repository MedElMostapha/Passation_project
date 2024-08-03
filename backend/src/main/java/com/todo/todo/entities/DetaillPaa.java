package com.todo.todo.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import jakarta.persistence.*;
import java.io.Serializable;
import java.sql.Timestamp;
import java.time.LocalDate;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString

public class DetaillPaa implements Serializable {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Integer id;
        private String objetDepense;
        private String inpuBudgetaire;

        private Double mntEstimatif;

        private Double montantRestant;

        private LocalDate datePreviLancement;
        private LocalDate datePreviAttribution;
        private Timestamp dateCrationProcedure;

        private boolean enprocedure = false;
        private boolean isvalidated = false;

        private Nature nature;

        @ManyToOne
        @JoinColumns({ @JoinColumn(name = "Contrat") })
        private Contrat typeMarche;

        @ManyToOne
        @JoinColumns({ @JoinColumn(name = "ModSelection") })
        private ModeSelection modPassation;

        @ManyToOne
        private Paa paa;

        @ManyToOne
        @JoinColumn(name = "etablissement")
        private Etablissement etablissement;

        @ManyToOne
        @JoinColumn(name = "user_id")
        private User user;

        public void setMontantRestant(Double montantRestant) {
                this.montantRestant = montantRestant;
        }

}

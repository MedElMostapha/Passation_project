package com.todo.todo.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.todo.todo.entities.Contrat;
import com.todo.todo.entities.Etablissement;
import com.todo.todo.entities.InputBudgetaire;
import com.todo.todo.entities.ModeSelection;
import com.todo.todo.repositories.ContratRepository;
import com.todo.todo.repositories.EtablissementRepository;
import com.todo.todo.repositories.InputBudgetaireRepository;
import com.todo.todo.repositories.ModeSelectionRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class InputBudgetaireService {

        @Autowired
        private InputBudgetaireRepository inputBudgetaireRepository;

        @Autowired
        private EtablissementRepository etablissementRepository;

        @Autowired
        private ContratRepository typeMarcher;

        @Autowired
        private ModeSelectionRepository modeRepository;

        public InputBudgetaire createInputBudgetaire(Integer typeSelectionid, Integer typeMarcherid,
                        Integer etablissementId) {
                int currentYear = LocalDate.now().getYear();

                ModeSelection typeSelection = modeRepository.findById(typeSelectionid)
                                .orElseThrow(() -> new IllegalArgumentException("Type de selection not found"));

                Contrat typeMarche = typeMarcher.findById(typeMarcherid)
                                .orElseThrow(() -> new IllegalArgumentException("Type de marche not found"));

                InputBudgetaire lastInput = inputBudgetaireRepository
                                .findTopByYearAndTypeSelectionOrderByUniqueIdDesc(currentYear, typeSelection);
                int newUniqueId = (lastInput != null) ? lastInput.getUniqueId() + 1 : 1;

                Etablissement etablissement = etablissementRepository.findById(etablissementId)
                                .orElseThrow(() -> new IllegalArgumentException("Etablissement not found"));

                String budgetNumber = String.format("%d-%d-%01d-%04d", currentYear, etablissement.getId(),
                                typeSelection.getId(), newUniqueId);

                // InputBudgetaire inputBudgetaire = new InputBudgetaire(budgetNumber, currentYear,
                //                 newUniqueId, LocalDate.now(), etablissement, typeSelection, typeMarche);
                InputBudgetaire inputBudgetaire = new InputBudgetaire();
                inputBudgetaire.setBudgetNumber(budgetNumber);
                inputBudgetaire.setYear(currentYear);
                inputBudgetaire.setUniqueId(newUniqueId);
                inputBudgetaire.setCreatedDate(LocalDate.now());
                inputBudgetaire.setEtablissement(etablissement);
                inputBudgetaire.setTypeSelection(typeSelection);
                inputBudgetaire.setTypeMarcher(typeMarche);
                return inputBudgetaireRepository.save(inputBudgetaire);
        }

        public List<InputBudgetaire> getInputs() {
                return inputBudgetaireRepository.findAll();
        }

        public void deleteInput(Long id) {
                Optional<InputBudgetaire> input = inputBudgetaireRepository.findById(id);
                
                inputBudgetaireRepository.deleteById(id);
        }
}

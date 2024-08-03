package com.todo.todo.repositories;


import java.util.List;


import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.todo.todo.entities.InputBudgetaire;
import com.todo.todo.entities.ModeSelection;

@Repository
public interface InputBudgetaireRepository extends JpaRepository<InputBudgetaire, Long> {
    InputBudgetaire findTopByYearAndTypeSelectionOrderByUniqueIdDesc(int year, ModeSelection modeSelection);

    InputBudgetaire findByBudgetNumber(String budgetNumber);

    @Query("SELECT ib FROM InputBudgetaire ib WHERE ib.etablissement IS NOT NULL")
    List<InputBudgetaire> findAllWithEtablissement();

}

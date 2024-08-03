package com.todo.todo.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.todo.todo.entities.Paa;

@Repository
public interface PaaRepository extends JpaRepository<Paa, Integer> {

        List<Paa> findByEtablissementId(Integer etablissementId);

        @Query(value = "SELECT p.* FROM Paa p WHERE p.Created_at = (SELECT MAX(p2.Created_at) FROM Paa p2 WHERE p2.etablissement_id = p.etablissement_id)", nativeQuery = true)
        List<Paa> findLatestPaaForAllEtablissements();

}

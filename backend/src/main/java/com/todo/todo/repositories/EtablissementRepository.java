package com.todo.todo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.todo.todo.entities.Etablissement;

@Repository
public interface EtablissementRepository extends JpaRepository<Etablissement, Integer> {
}

package com.todo.todo.repositories;


import org.springframework.data.jpa.repository.JpaRepository;

import com.todo.todo.entities.Contrat;

public interface ContratRepository extends JpaRepository<Contrat,Integer> {
}

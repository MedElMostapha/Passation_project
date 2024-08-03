package com.todo.todo.repositories;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.todo.todo.entities.Lettre;

public interface LettreRepository extends JpaRepository<Lettre,Integer> {


}

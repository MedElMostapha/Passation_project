package com.todo.todo.repositories;


import org.springframework.data.jpa.repository.JpaRepository;

import com.todo.todo.entities.ProcedurePaa;

public interface ProcedureRepository extends JpaRepository<ProcedurePaa, Integer> {

}

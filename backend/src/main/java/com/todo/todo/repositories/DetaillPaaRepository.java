package com.todo.todo.repositories;


import org.springframework.data.jpa.repository.JpaRepository;

import com.todo.todo.entities.DetaillPaa;

import java.util.List;

public interface DetaillPaaRepository extends JpaRepository<DetaillPaa, Integer> {

    List<DetaillPaa> findByEtablissementId(Integer etablissementId);
    List<DetaillPaa> findByPaaId(Integer paaid);



   


}

package com.todo.todo.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.todo.todo.entities.Todo;

public interface TodoRepository extends JpaRepository<Todo, Long> {

    
    List<Todo> findById(long id);
   

}

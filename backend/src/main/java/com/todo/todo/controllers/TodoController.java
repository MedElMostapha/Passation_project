package com.todo.todo.controllers;



import java.util.List;
import org.springframework.web.bind.annotation.RestController;

import com.todo.todo.entities.Todo;
import com.todo.todo.repositories.TodoRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@RestController
@RequestMapping("/todos")
@CrossOrigin(origins = "*")
public class TodoController {

    @Autowired
    private TodoRepository todoRepository;

    @GetMapping("")
    @PreAuthorize("hasAuthority('USER')")
    List<Todo> getTodos() {
        return  todoRepository.findAll();

    }

    @PostMapping("")
    @PreAuthorize("hasAuthority('USER')")

    void create(@RequestBody Todo todo) {
        todoRepository.save(todo);
    }


    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('USER')")

    void delete(@PathVariable Long id) {
        todoRepository.deleteById(id);
        
    }



    @GetMapping("/{id}")
    @PreAuthorize("hasAuthority('USER')")

    Todo todoByID(@PathVariable Long id) {

        return todoRepository.findById(id).get();

    }
    
    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('USER')")

    Todo updateStatus(@PathVariable Long id) {
        
        Todo todo = todoRepository.findById(id).get();
        todo.setIscompleted(!todo.isIscompleted());
        return todoRepository.save(todo);


    }
    
    
    

}

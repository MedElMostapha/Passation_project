package com.todo.todo.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.todo.todo.entities.Role;
import com.todo.todo.entities.User;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findBynom(String nom);


    // User findByUsername(String username);


    
    
    


}

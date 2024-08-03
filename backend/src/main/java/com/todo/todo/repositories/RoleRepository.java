package com.todo.todo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.todo.todo.entities.Role;

public interface RoleRepository extends JpaRepository<Role, Long> {

    Role findByNom(String nom);

}

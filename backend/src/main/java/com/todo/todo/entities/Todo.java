package com.todo.todo.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data @NoArgsConstructor @AllArgsConstructor
public class Todo {


    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String nom;
    private boolean iscompleted=false;
    
}

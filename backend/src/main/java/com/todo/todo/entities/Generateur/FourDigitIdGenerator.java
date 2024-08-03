package com.todo.todo.entities.Generateur;


import org.hibernate.HibernateException;
import org.hibernate.engine.spi.SharedSessionContractImplementor;
import org.hibernate.id.IdentifierGenerator;

import java.io.Serializable;
import java.util.Random;

public class FourDigitIdGenerator implements IdentifierGenerator {

    @Override
    public Serializable generate(SharedSessionContractImplementor session, Object object) throws HibernateException {
        Random random = new Random();
        int id = 0;
        while (id < 1000) { // Ensuring the ID is at least 4 digits
            id = random.nextInt(9999);
        }
        return id;
    }
}

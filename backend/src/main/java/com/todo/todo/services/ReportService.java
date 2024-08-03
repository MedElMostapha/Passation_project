package com.todo.todo.services;

import net.sf.jasperreports.engine.*;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import org.springframework.stereotype.Service;

import com.todo.todo.entities.Lettre;
import com.todo.todo.entities.ProcedurePaa;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.sql.Date;

@Service
public class ReportService {

    public byte[] generateProcedureReport(ProcedurePaa procedurePaa) throws JRException {
        // Imprimer les valeurs de procedurePaa pour vérifier leur contenu

        // Load the JRXML file
        JasperReport jasperReport = JasperCompileManager.compileReport(
                "C:\\Users\\lapto\\Desktop\\stage_project\\passationBack-main\\passationBack-main\\authentification\\src\\main\\resources\\demandeIP.jrxml");

        // Create a JRBeanCollectionDataSource
        JRBeanCollectionDataSource dataSource = new JRBeanCollectionDataSource(List.of(procedurePaa));

        // Set parameters (if any)
        Map<String, Object> parameters = new HashMap<>();
        parameters.put("ProcedureId", procedurePaa.getId());
        parameters.put("origine", procedurePaa.getOrigin());
        parameters.put("destinataire", procedurePaa.getDestinataire());
        parameters.put("description", procedurePaa.getDescription());
        parameters.put("sourceFinanciere", procedurePaa.getSourceFinanciere());
        parameters.put("deadlineEstime", Date.valueOf(procedurePaa.getDeadlineEstime())); // Convertir LocalDate en
                                                                                          // java.sql.Date
        parameters.put("id", procedurePaa.getPaa().getId());

        parameters.put("montant", procedurePaa.getMontant());

        // Fill the report
        JasperPrint jasperPrint = JasperFillManager.fillReport(jasperReport, parameters, dataSource);

        // Export the report to a byte array
        return JasperExportManager.exportReportToPdf(jasperPrint);
    }

    public byte[] generateLettreReport(Lettre lettre) throws JRException {
        // Load the JRXML file
        JasperReport jasperReport = JasperCompileManager.compileReport(
                "C:\\Users\\lapto\\Desktop\\todo\\src\\main\\resources\\lettres.jrxml");

        // Create a JRBeanCollectionDataSource
        JRBeanCollectionDataSource dataSource = new JRBeanCollectionDataSource(List.of(lettre));

        // Set parameters
        Map<String, Object> parameters = new HashMap<>();
        parameters.put("ConsultantName", lettre.getNomFournissuer());
        parameters.put("AuthorityName", lettre.getNonAutoriteContractante());
        parameters.put("Subject", lettre.getObjetDepence());

        
        // Fill the report
        JasperPrint jasperPrint = JasperFillManager.fillReport(jasperReport, parameters, dataSource);

        // Export the report to a byte array
        return JasperExportManager.exportReportToPdf(jasperPrint);
    }

}

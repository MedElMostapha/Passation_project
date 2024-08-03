package com.todo.todo.services;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.todo.todo.entities.DetaillPaa;
import com.todo.todo.entities.Etat;
import com.todo.todo.entities.InputBudgetaire;
import com.todo.todo.entities.Nature;
import com.todo.todo.entities.Paa;
import com.todo.todo.entities.User;
import com.todo.todo.repositories.DetaillPaaRepository;
import com.todo.todo.repositories.InputBudgetaireRepository;
import com.todo.todo.repositories.PaaRepository;
import com.todo.todo.repositories.UserRepository;

import org.apache.commons.io.FilenameUtils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import java.util.Iterator;

import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;

import org.apache.poi.ss.usermodel.*;

@Service
@Transactional
public class PaaService {

    private Boolean created = false;

    private Paa savePaa;

    @Autowired
    private DetaillPaaRepository repo;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private InputBudgetaireRepository input;

    @Autowired
    private PaaRepository paaRepository;

    public List<DetaillPaa> getAllPaa() {
        return repo.findAll();
        // return repo.getAllPaas();
    }

    public Optional<DetaillPaa> getPaa(Integer id) {
        return repo.findById(id);
    }

    public List<Paa> getPlansByEtablissementId(Integer etablissementId) {
        return paaRepository.findByEtablissementId(etablissementId);
    }

    public List<DetaillPaa> getPlansByPaaId(Integer paaid) {
        return repo.findByPaaId(paaid);
    }

    public DetaillPaa modifierPaa(Integer id, DetaillPaa Paa) {
        DetaillPaa paa = repo.findById(id).orElseThrow();
        if (paa == null)
            throw new RuntimeException("le PAA non trouvé !");
        paa.setObjetDepense(Paa.getObjetDepense());
        paa.setInpuBudgetaire(Paa.getInpuBudgetaire());
        paa.setMntEstimatif(Paa.getMntEstimatif());
        if (paa.getMntEstimatif() > paa.getMontantRestant()) {
            paa.setMontantRestant(Paa.getMntEstimatif() - paa.getMontantRestant());
        } else {
            paa.setMontantRestant(Paa.getMntEstimatif());

        }
        paa.setDatePreviAttribution(Paa.getDatePreviAttribution());
        paa.setDatePreviLancement(Paa.getDatePreviLancement());
        repo.save(paa);
        return paa;
    }

    public DetaillPaa validatePlanAnuellAchat(Integer id) {
        // Fetch the plan_anuell_achat by id
        DetaillPaa paa = repo.findById(id).orElseThrow();

        // Set the validation status to true
        paa.setIsvalidated(true);

        // Save the updated plan_anuell_achat back to the database
        return repo.save(paa);
    }

    public ResponseEntity<String> saveExcelData(MultipartFile file) throws IOException {
        Workbook workbook = new XSSFWorkbook(file.getInputStream());
        Sheet sheet = workbook.getSheetAt(0);
        Iterator<Row> rows = sheet.iterator();

        while (rows.hasNext()) {
            Row currentRow = rows.next();
            if (currentRow.getRowNum() == 0) { // Skip header row
                continue;
            }

            // Check if the row is empty and break the loop if it is
            if (isRowEmpty(currentRow)) {
                break;
            }

            InputBudgetaire inputBudgetaire = input.findByBudgetNumber(getStringCellValue(currentRow.getCell(1)));

            if (inputBudgetaire != null) {

                Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
                User user = userRepository.findBynom(authentication.getName())
                        .orElseThrow(() -> new UsernameNotFoundException("User not found"));

                if (this.created == false) {

                    List<Paa> lPaas = paaRepository.findByEtablissementId(inputBudgetaire.getEtablissement().getId());

                    Paa newPaa = new Paa();

                    if (!lPaas.isEmpty()) {

                        newPaa.setEtat(Etat.ACTUALISE);
                    } else {
                        newPaa.setEtat(Etat.INITIALE);

                    }

                    newPaa.setEtablissement(inputBudgetaire.getEtablissement());
                    newPaa.setUser(user);
                    this.savePaa = paaRepository.save(newPaa);
                    this.created = true;
                }

                DetaillPaa paa = new DetaillPaa();

                paa.setObjetDepense(getStringCellValue(currentRow.getCell(0)));
                paa.setInpuBudgetaire(getStringCellValue(currentRow.getCell(1)));
                paa.setMntEstimatif(getNumericCellValue(currentRow.getCell(2)));
                paa.setMontantRestant(getNumericCellValue(currentRow.getCell(2)));

                LocalDate datePreviLancement = getLocalDateFromString(currentRow.getCell(3));
                LocalDate datePreviAttribution = getLocalDateFromString(currentRow.getCell(4));

                paa.setDatePreviLancement(datePreviLancement);
                paa.setDatePreviAttribution(datePreviAttribution);
                paa.setEtablissement(inputBudgetaire.getEtablissement());
                paa.setModPassation(inputBudgetaire.getTypeSelection());
                paa.setTypeMarche(inputBudgetaire.getTypeMarcher());
                paa.setPaa(this.savePaa);

                paa.setUser(user);

                switch (getStringCellValue(currentRow.getCell(5))) {
                    case "Fourniture":

                        paa.setNature(Nature.Fourniture);
                        break;

                    case "Travau":

                        paa.setNature(Nature.Travau);

                        break;

                    default:
                        break;
                }

                // Ajoutez d'autres colonnes selon votre table
                repo.save(paa);

            } else {
                return new ResponseEntity<String>("l'input budgetaire est invalid",
                        HttpStatus.INTERNAL_SERVER_ERROR);
            }

        }

        this.created = false;

        workbook.close();
        return new ResponseEntity<String>("PAA ajouté ",
                HttpStatus.CREATED);
    }

    private boolean isRowEmpty(Row row) {
        for (int cellNum = 0; cellNum < row.getLastCellNum(); cellNum++) {
            Cell cell = row.getCell(cellNum);
            if (cell != null && cell.getCellType() != CellType.BLANK) {
                return false;
            }
        }
        return true;
    }

    private String getStringCellValue(Cell cell) {
        if (cell == null) {
            return "";
        }
        cell.setCellType(CellType.STRING);
        return cell.getStringCellValue();
    }

    private double getNumericCellValue(Cell cell) {
        if (cell == null) {
            return 0;
        }
        if (cell.getCellType() == CellType.STRING) {
            return Double.parseDouble(cell.getStringCellValue());
        }
        return cell.getNumericCellValue();
    }

    public LocalDate getLocalDateFromString(Cell cell) {
        if (cell == null || cell.getCellType() == CellType.BLANK) {
            return null; // Handle empty cells
        }

        try {
            if (cell.getCellType() == CellType.NUMERIC && DateUtil.isCellDateFormatted(cell)) {
                // If the cell is a date in numeric format
                return cell.getDateCellValue().toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
            } else if (cell.getCellType() == CellType.STRING) {
                // Attempt to parse the date from a string
                DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd"); // Adjust format as needed
                return LocalDate.parse(cell.getStringCellValue(), formatter);
            } else {
                // Handle other cell types if needed
                System.err.println("Unsupported cell type for date parsing.");
                return null;
            }
        } catch (DateTimeParseException | IllegalStateException e) {
            // Handle date parsing errors
            System.err.println("Error parsing date: " + e.getMessage());
            return null;
        }
    }

    public void deletePaa(Integer id) {
        repo.deleteById(id);
    }

}

package com.todo.todo.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.todo.todo.DTO.LettreDTO;
import com.todo.todo.entities.DetaillPaa;
import com.todo.todo.entities.Dossier;
import com.todo.todo.entities.Lettre;
import com.todo.todo.repositories.DetaillPaaRepository;
import com.todo.todo.repositories.DossierRepository;
import com.todo.todo.repositories.LettreRepository;

import net.sf.jasperreports.engine.JRException;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Service
public class DossierService {
    @Autowired
    private DossierRepository dossierRepository;

    @Autowired
    private LettreRepository lettreRepository;

    @Autowired
    private DetaillPaaRepository planRepository;

    @Autowired
    private ReportService reportService;

    public List<Dossier> getAllDossier() {
        return dossierRepository.findAll();
    }

    // public List<Lettre> getAllLettres(Integer id) {
    // return dossierRepository.getLettres(id);
    // }

    // public List<Lettre> LettresNotInPlis(Integer id) {
    // return dossierRepository.LettresNotInPlis(id);
    // }

    public Dossier createDosssier(Dossier data) {

        return dossierRepository.save(data);
    }

    public List<Lettre> createLettre(LettreDTO data) throws IOException {
        List<Lettre> lettres = new ArrayList<>();

        if (data.getFournisseurs() != null) {

            data.getFournisseurs().forEach(fournisseur -> {
                Lettre lettre = new Lettre();
                lettre.setDateAnterieurDepot(data.getDateAnterieurDepot());
                lettre.setObjetDepence(data.getObjetDepence());
                lettre.setNomFournissuer(fournisseur);
                lettre.setNonAutoriteContractante(data.getNonAutoriteContractante());
                Lettre savedLettre = lettreRepository.save(lettre);
                lettres.add(savedLettre);

                try {
                    byte[] report = reportService.generateLettreReport(savedLettre);
                    String reportPath = "C:\\Users\\lapto\\Desktop\\todo\\src\\main\\resources\\uploads\\lettres\\"
                            + savedLettre.getId() + "_lettre" + ".pdf";
                    Files.write(Paths.get(reportPath), report);
                } catch (JRException | IOException e) {
                    e.printStackTrace();
                }
            });
        }

        return lettres;
    }

    // public DetaillPaa updatePaaDossier(Integer id) {
    // DetaillPaa paa = planRepository.findById(id).orElseThrow();
    // if (paa == null)
    // throw new RuntimeException("le PAA non trouvé !");
    // // planRepository.updatePaaDossier(!paa.isDosssierCree(), id);
    // DetaillPaa paa1 = planRepository.findById(id).orElseThrow();
    // return paa1;
    // }

    // public Dossier updateDossier(Integer id) {
    // Dossier dossier = dossierRepository.getDossier(id);
    // if (dossier == null)
    // throw new RuntimeException("le Dossier non trouvé !");
    // dossierRepository.updateDossier(!dossier.isLettreCree(), id);
    // Dossier dossier1 = dossierRepository.getDossier(id);
    // return dossier1;
    // }

    // public Dossier updateEtat(Integer id) {
    // Dossier dossier = dossierRepository.getDossier(id);
    // if (dossier == null)
    // throw new RuntimeException("le Dossier non trouvé !");
    // dossierRepository.updateEtat(!dossier.isOuvert(),id);

    // Dossier dossier1 = dossierRepository.getDossier(id);
    // return dossier1;
    // }
}

package com.todo.todo.security;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.todo.todo.entities.Role;
import com.todo.todo.entities.User;
import com.todo.todo.repositories.RoleRepository;
import com.todo.todo.repositories.UserRepository;

import io.micrometer.observation.Observation.Scope;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.JwsHeader;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*")
public class SecurityController {

        @Autowired
        private AuthenticationManager authenticationManager;

        @Autowired
        private JwtEncoder jwtEncoder;

        @Autowired
        private RoleRepository roleRepository;

        @Autowired
        private UserRepository userRepository;

        @GetMapping("/profile")
        public Authentication getProfile() {
                return SecurityContextHolder.getContext().getAuthentication();
        }

        @CrossOrigin(origins = "*")
        @PostMapping("/login")
        public Map<String, Object> login(@RequestBody LoginRequest loginRequest) {

                Authentication authentication = authenticationManager
                                .authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getNom(),
                                                loginRequest.getPassword()));

                Instant instant = Instant.now();
                String scope = authentication.getAuthorities().stream()
                                .map(a -> a.getAuthority())
                                .collect(Collectors.joining(" "));

                JwtClaimsSet jwtClaimsSet = JwtClaimsSet.builder()
                                .issuedAt(instant)
                                // .expiresAt(instant.plus(10, ChronoUnit.MINUTES))
                                .subject(loginRequest.getNom())

                                .claim("scope", scope)
                                .build();

                JwtEncoderParameters jwtEncoderParameters = JwtEncoderParameters.from(
                                JwsHeader.with(MacAlgorithm.HS256).build(),
                                jwtClaimsSet);
                String jwt = jwtEncoder.encode(jwtEncoderParameters).getTokenValue();

                String firstRole = scope.split(" ")[0];

                // Récupérer l'identifiant du rôle
                Role role = roleRepository.findByNom(firstRole); // Assumez que vous avez une méthode pour trouver un
                                                                 // rôle par nom
                Long idProfile = role.getId();

                // Récupérer l'utilisateur authentifié
                User authenticatedUser = (User) authentication.getPrincipal();
                Long idUser = authenticatedUser.getId();
                String prenom = authenticatedUser.getPrenom();

                return Map.of(
                                "userId", idUser,
                                "roleId", idProfile,
                                "nom", jwtClaimsSet.getSubject(),
                                "prenom", prenom,
                                "access-token", jwt);
        }

}

package utp.BroszuraProduktowa.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import lombok.Getter;
import utp.BroszuraProduktowa.model.AuthenticationRequest;
import utp.BroszuraProduktowa.model.AuthenticationResponse;
import utp.BroszuraProduktowa.model.UserDAO;
import utp.BroszuraProduktowa.model.DTO.UserDTO;
import utp.BroszuraProduktowa.repository.UserRepository;
import utp.BroszuraProduktowa.util.JWTUtil;

@Service
public class UserService {
    
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private JWTUtil jwtTokenUtil;

    @Getter
    private Authentication authentication;

    public ResponseEntity<?> register(UserDTO user, String role) {

        Optional<UserDAO> u = userRepository.findByUsernameOrEmail(user.getUsername(), user.getEmail());

        if (!u.isPresent()) {
            UserDAO userDAO = new UserDAO();
            userDAO.setUsername(user.getUsername());
            userDAO.setPassword(passwordEncoder.encode(user.getPassword()));
            userDAO.setEmail(user.getEmail());
            userDAO.setActive(true);
            userDAO.setRoles(role);
    
            userRepository.save(userDAO);    
        } else
            return new ResponseEntity<Object>("User already registered with this username or e-mail.", HttpStatus.FOUND);

        return ResponseEntity.ok(null);
    }

    public ResponseEntity<?> createAuthenticationToken(AuthenticationRequest authenticationRequest) {
		HttpHeaders httpHeaders = new HttpHeaders();
		httpHeaders.setContentType(MediaType.APPLICATION_JSON);

		try {
			this.authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authenticationRequest.getUsername(), authenticationRequest.getPassword()));
		} catch (BadCredentialsException e) {
			return new ResponseEntity<Object>("{\"error\":\"Incorrect username or password.\"}", httpHeaders, HttpStatus.OK);
		} catch (DisabledException e) {
			return new ResponseEntity<Object>("{\"error\":\"Accoount is disabled.\"}", httpHeaders, HttpStatus.OK);
		}


		final UserDetails userDetails = userDetailsService.loadUserByUsername(authenticationRequest.getUsername());

		final String jwt = jwtTokenUtil.generateToken(userDetails);

		return ResponseEntity.ok(new AuthenticationResponse(jwt));
    }
}

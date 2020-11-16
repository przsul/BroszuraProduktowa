package utp.BroszuraProduktowa.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import utp.BroszuraProduktowa.model.UserDAO;
import utp.BroszuraProduktowa.model.DTO.UserDTO;
import utp.BroszuraProduktowa.repository.UserRepository;

@Service
public class UserService {
    
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

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
}
